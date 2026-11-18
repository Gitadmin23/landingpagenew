"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
    IoCalendarOutline,
    IoLocationOutline,
    IoCheckmarkCircle,
    IoChevronBack,
    IoChevronForward,
    IoStar,
    IoAdd,
} from "react-icons/io5";
import moment from "moment";
import { unsecureHttpService } from "@/helpers/services/httpService";
import { IMAGE_URL } from "@/helpers/services/urls";
import type { IEvent } from "@/helpers/models/event";
import type { IBusiness } from "@/helpers/models/product";
import InterestedUsers from "../shared/interestedUser";
import { IUser } from "@/helpers/models/user";

interface EventItem {
    id: string;
    title: string;
    category: string;
    statusBadge: string;
    statusBg: string;
    date: string;
    location: string;
    hostName: string;
    hostAvatar: string;
    priceLabel: string;
    price: string;
    priceSub?: string;
    priceColor?: string;
    buttonText: string;
    buttonBg: string;
    buttonColor: string;
    image: string;
    interestedUsers: IUser[]
    count: number
}

const fallbackImage = "/images/events/afrobeats-concert.jpg";
const fallbackServiceImage = "/images/for-professionals.jpg";

const formatEventDate = (timestamp?: number) => {
    if (!timestamp) return "Date to be announced";
    return moment(timestamp).format("ddd, D MMM YYYY • h:mm A");
};

const getHostName = (createdBy: any) => {
    if (!createdBy) return "Chasescroll Host";
    const name = `${createdBy.firstName || ""} ${createdBy.lastName || ""}`.trim();
    return name || createdBy.username || "Chasescroll Host";
};


const SHARELINK = process.env.NEXT_PUBLIC_SHAREPAGE_URL


const getHostInitials = (name: string) => {
    if (!name) return "CS";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2 && parts[0][0] && parts[1][0]) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "CS";
};

const getImageUrl = (picUrl?: string, fallback: string = fallbackImage) => {
    if (!picUrl) return fallback;
    if (picUrl.startsWith("http://") || picUrl.startsWith("https://")) return picUrl;
    const base = IMAGE_URL || "https://test-api.chasescroll.com/resource-api/download/";
    return base.endsWith("/") ? `${base}${picUrl}` : `${base}/${picUrl}`;
};

const formatLocation = (loc: any) => {
    if (!loc) return "Lagos, Nigeria";
    if (loc.toBeAnnounced) return "Location to be announced";
    return loc.locationDetails || loc.address || loc.placeIds || "Lagos, Nigeria";
};

const formatCategory = (cat?: string) => {
    if (!cat) return "Professional Service";
    return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const getVendorDisplayName = (service: IBusiness) => {
    if (service.vendor) {
        const v = service.vendor;
        const name = `${v.firstName || ""} ${v.lastName || ""}`.trim();
        if (name) return name;
        if (v.username) return v.username;
    }
    if (service.name) {
        const firstLine = service.name.split("\n")[0].trim();
        if (firstLine.length > 28) {
            return firstLine.slice(0, 28) + "...";
        }
        return firstLine;
    }
    return "Verified Professional";
};

const formatServicePrice = (service: IBusiness) => {
    if (!service.price) return "Contact for price";
    const numPrice = Number(service.price);
    if (isNaN(numPrice) || numPrice === 0) return "Free Consultation";
    const formatted = `₦${numPrice.toLocaleString()}`;
    return service.hasFixedPrice ? `From ${formatted}` : `From ${formatted}/hr`;
};

const mapApiEventToEventItem = (ev: IEvent, index: number): EventItem => {
    const isFree = ev.isFree || !ev.minPrice || ev.minPrice === 0;
    const hostName = getHostName(ev.createdBy);
    const hostAvatar = getHostInitials(hostName);
    const currencySymbol = (ev.currency as string) === "USD" ? "$" : "₦";

    return {
        id: ev.id || String(index + 1),
        title: (ev.eventName || "Untitled Event").trim(),
        category: ev.eventType ? ev.eventType.replace(/_/g, " ") : "Curated Event",
        statusBadge: isFree ? "FREE RSVP" : "TICKETS AVAILABLE",
        statusBg: isFree ? "#059669" : "#5465E0",
        date: formatEventDate(ev.startDate || ev.startTime),
        location: formatLocation(ev.location),
        hostName,
        hostAvatar,
        priceLabel: isFree ? "ADMISSION" : "PRICE",
        price: isFree ? "FREE / RSVP" : `${currencySymbol}${Number(ev.minPrice).toLocaleString()}`,
        priceColor: isFree ? "#059669" : "#0F172A",
        buttonText: isFree ? "Claim Seat" : "Buy Ticket",
        buttonBg: isFree ? "#EEF2FF" : "#5465E0",
        buttonColor: isFree ? "#4F46E5" : "white",
        image: getImageUrl(ev.currentPicUrl, fallbackImage),
        interestedUsers: ev.interestedUsers || [],
        count: ev.memberCount || 0
    };
};

export default function CuratedEventsSection() {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<EventItem[]>([]);
    const [services, setServices] = useState<IBusiness[]>([]);
    const [mode, setMode] = useState<"events" | "services" | "empty">("events");
    const [loading, setLoading] = useState(true);

    const scroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    const routeToPage = (id: string) => {
        if (mode === "events") {
            window.location.href = `${SHARELINK}/event/${id}`
        } else if (mode === "services") {
            window.location.href = `${SHARELINK}/service/${id}`
        }
    }

    useEffect(() => {
        let isMounted = true;

        const fetchContent = async () => {
            try {
                setLoading(true);

                // 1. Attempt to fetch live events/products from /events/events
                let eventItems: IEvent[] = [];
                try {
                    const eventRes = await unsecureHttpService.get("/events/events?size=10");
                    eventItems = eventRes.data?.content || [];
                } catch (e) {
                    console.warn("Could not fetch events:", e);
                }

                // Filter valid events with ticket products
                const validEvents = eventItems.filter(
                    (ev) => ev && (ev.eventName || ev.id) && (ev.productTypeData?.length > 0 || ev.minPrice > 0 || ev.isFree)
                );

                if (isMounted) {
                    if (validEvents.length > 0) {
                        setEvents(validEvents.slice(0, 10).map((ev, idx) => mapApiEventToEventItem(ev, idx)));
                        setMode("events");
                    } else {
                        // If there are no products, fetch live services from searchBusiness
                        await fetchServices();
                    }
                }
            } catch (error) {
                console.error("Failed to load curated events, falling back to services:", error);
                if (isMounted) {
                    await fetchServices();
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        const fetchServices = async () => {
            try {
                // Fetch up to 10 live services from /business-service/search (searchBusiness endpoint)
                const res = await unsecureHttpService.get("/business-service/search?size=10");
                const serviceItems: IBusiness[] = res.data?.content || [];
                console.log(serviceItems);

                if (isMounted) {
                    if (serviceItems.length > 0) {
                        setServices(serviceItems.slice(0, 10));
                        setMode("services");
                    } else {
                        setMode("empty");
                    }
                }
            } catch (err) {
                console.error("Failed to load services from searchBusiness:", err);
                if (isMounted) {
                    setMode("empty");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
        return () => {
            isMounted = false;
        };
    }, []);

    const isServicesMode = mode === "services";

    return (
        <Flex
            w={"full"}
            bg={"white"}
            py={["12", "14", "18"]}
            px={["5", "6", "12"]}
            justifyContent={"center"}
            borderBottom={"1px solid"}
            borderColor={"#F1F5F9"}
        >
            <Flex w={"full"} maxW={"1280px"} flexDir={"column"} gap={["6", "8", "8"]}>
                {/* Header Row with Navigation Buttons */}
                <Flex
                    w={"full"}
                    justifyContent={"space-between"}
                    alignItems={["flex-start", "flex-end", "flex-end"]}
                    flexDir={["column", "row", "row"]}
                    gap={"4"}
                >
                    <Box maxW={"720px"}>
                        <Text
                            as="h2"
                            fontSize={["24px", "28px", "32px"]}
                            lineHeight={["120%", "120%", "115%"]}
                            fontWeight={"800"}
                            color={"#0F172A"}
                            letterSpacing={"-0.02em"}
                        >
                            {isServicesMode
                                ? "Featured Services & Verified Professionals"
                                : "Curated Events in Lagos, Abuja & Diaspora"}
                        </Text>
                        <Text
                            fontSize={["13px", "14px", "15px"]}
                            color={"#64748B"}
                            mt={"1.5"}
                            fontWeight={"400"}
                        >
                            {isServicesMode
                                ? "Strict escrow protection. Payments released to service providers only after verified delivery."
                                : "Strict escrow protection. Funds released to host only after successful check-in."}
                        </Text>
                    </Box>

                    <Flex alignItems={"center"} gap={"3"}>
                        {/* Left & Right Scroll Buttons */}
                        <Flex alignItems={"center"} gap={"2"}>
                            <Flex
                                as="button"
                                onClick={() => scroll(-380)}
                                alignItems={"center"}
                                justifyContent={"center"}
                                w={"38px"}
                                h={"38px"}
                                rounded={"full"}
                                border={"1px solid #E2E8F0"}
                                bg={"white"}
                                color={"#0F172A"}
                                cursor={"pointer"}
                                transition={"all 0.2s ease"}
                                _hover={{ bg: "#F1F5F9", borderColor: "#CBD5E1" }}
                                aria-label="Scroll left"
                            >
                                <IoChevronBack size={"18px"} />
                            </Flex>
                            <Flex
                                as="button"
                                onClick={() => scroll(380)}
                                alignItems={"center"}
                                justifyContent={"center"}
                                w={"38px"}
                                h={"38px"}
                                rounded={"full"}
                                border={"1px solid #E2E8F0"}
                                bg={"white"}
                                color={"#0F172A"}
                                cursor={"pointer"}
                                transition={"all 0.2s ease"}
                                _hover={{ bg: "#F1F5F9", borderColor: "#CBD5E1" }}
                                aria-label="Scroll right"
                            >
                                <IoChevronForward size={"18px"} />
                            </Flex>
                        </Flex>

                        {/* See All Button */}
                        <Flex
                            as="button"
                            onClick={() => router.push(isServicesMode ? "/home/service" : "/home/event")}
                            alignItems={"center"}
                            justifyContent={"center"}
                            px={"4"}
                            py={"1.5"}
                            h={"38px"}
                            rounded={"full"}
                            border={"1px solid #E2E8F0"}
                            bg={"white"}
                            color={"#334155"}
                            fontWeight={"600"}
                            fontSize={"13px"}
                            cursor={"pointer"}
                            transition={"all 0.2s ease"}
                            _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
                        >
                            See all
                        </Flex>
                    </Flex>
                </Flex>

                {/* Loading Skeleton */}
                {loading ? (
                    <Flex
                        w={"full"}
                        overflowX={"auto"}
                        overflowY={"hidden"}
                        className="hide-scrollbar"
                        gap={["5", "6", "6"]}
                        py={"2"}
                    >
                        {[...Array(6)].map((_, i) => (
                            <Flex
                                key={i}
                                w={["290px", "320px", "360px"]}
                                flexShrink={0}
                                flexDir={"column"}
                                bg={"white"}
                                rounded={"24px"}
                                overflow={"hidden"}
                                border={"1px solid #E2E8F0"}
                                p={"5"}
                                gap={"4"}
                            >
                                <Skeleton height={"210px"} rounded={"16px"} />
                                <Skeleton height={"20px"} width={"40%"} />
                                <Skeleton height={"26px"} width={"85%"} />
                                <Skeleton height={"18px"} width={"60%"} />
                                <Flex justifyContent={"space-between"} alignItems={"center"} pt={"4"}>
                                    <Skeleton height={"32px"} width={"35%"} />
                                    <Skeleton height={"36px"} width={"35%"} rounded={"full"} />
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                ) : mode === "empty" ? (
                    <Flex
                        w={"full"}
                        py={"16"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDir={"column"}
                        gap={"4"}
                        bg={"#F8FAFC"}
                        rounded={"24px"}
                        border={"1px dashed #CBD5E1"}
                    >
                        <Text fontSize={"16px"} fontWeight={"600"} color={"#64748B"}>
                            No upcoming listings available at the moment.
                        </Text>
                        <Flex
                            as="button"
                            onClick={() => router.push("/home/service")}
                            alignItems={"center"}
                            justifyContent={"center"}
                            px={"6"}
                            py={"2.5"}
                            rounded={"full"}
                            bg={"#5465E0"}
                            color={"white"}
                            fontSize={"13px"}
                            fontWeight={"600"}
                            cursor={"pointer"}
                            transition={"all 0.2s ease"}
                            _hover={{ opacity: 0.9 }}
                        >
                            Explore services
                        </Flex>
                    </Flex>
                ) : isServicesMode ? (
                    /* Services Mode: Rendered with the exact service card layout from user reference */
                    <Flex
                        ref={scrollRef}
                        w={"full"}
                        overflowX={"auto"}
                        overflowY={"hidden"}
                        scrollBehavior={"smooth"}
                        className="hide-scrollbar"
                        gap={["5", "6", "6"]}
                        py={"2"}
                        px={"1"}
                    >
                        {services.map((service) => (
                            <Flex
                                key={service.id}
                                w={["290px", "320px", "360px"]}
                                flexShrink={0}
                                flexDir={"column"}
                                bg={"white"}
                                rounded={"24px"}
                                overflow={"hidden"}
                                border={"1px solid #E2E8F0"}
                                boxShadow={"0 4px 18px rgba(0, 0, 0, 0.04)"}
                                transition={"all 0.25s ease"}
                                _hover={{
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
                                    borderColor: "#CBD5E1",
                                }}
                            >
                                {/* Top Image with Dark Gradient Overlay, Category Badge, Title & Subtitle */}
                                <Box w={"full"} h={["200px", "210px", "225px"]} pos={"relative"} overflow={"hidden"}>
                                    <Image
                                        src={getImageUrl(service.images?.[0], fallbackServiceImage)}
                                        alt={service.name || "Professional Service"}
                                        w={"full"}
                                        h={"full"}
                                        objectFit={"cover"}
                                        transition={"transform 0.4s ease"}
                                        _hover={{ transform: "scale(1.04)" }}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = fallbackServiceImage;
                                        }}
                                    />

                                    {/* Gradient Overlay for text contrast */}
                                    <Box
                                        pos={"absolute"}
                                        inset={"0"}
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%)",
                                        }}
                                    />

                                    {/* Overlay Content at bottom of image */}
                                    <Flex
                                        pos={"absolute"}
                                        bottom={"3.5"}
                                        left={"3.5"}
                                        right={"3.5"}
                                        flexDir={"column"}
                                        alignItems={"flex-start"}
                                        gap={"1.5"}
                                    >
                                        {/* Category Badge Pill */}
                                        <Box
                                            px={"3"}
                                            py={"1"}
                                            rounded={"full"}
                                            bg={"#4F46E5"}
                                            color={"white"}
                                            fontSize={"12px"}
                                            fontWeight={"600"}
                                            boxShadow={"0 2px 8px rgba(0, 0, 0, 0.25)"}
                                        >
                                            {formatCategory(service.category)}
                                        </Box>

                                        {/* Name / Vendor Title */}
                                        <Text
                                            fontSize={"19px"}
                                            fontWeight={"700"}
                                            color={"white"}
                                            lineHeight={"125%"}
                                            lineClamp={1}
                                            textShadow={"0 2px 4px rgba(0,0,0,0.4)"}
                                        >
                                            {getVendorDisplayName(service)}
                                        </Text>

                                        {/* Subtitle / Category Label */}
                                        <Text
                                            fontSize={"13px"}
                                            fontWeight={"500"}
                                            color={"whiteAlpha.900"}
                                            lineClamp={1}
                                        >
                                            {formatCategory(service.category)}
                                        </Text>
                                    </Flex>
                                </Box>

                                {/* Card Body */}
                                <Flex flexDir={"column"} p={"5"} flex={"1"} justifyContent={"space-between"} gap={"3.5"}>
                                    {/* Rating & Price Row */}
                                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                                        {/* Rating & Reviews */}
                                        <Flex alignItems={"center"} gap={"1.5"}>
                                            <IoStar color={"#EA580C"} size={"17px"} />
                                            <Text fontSize={"15px"} fontWeight={"700"} color={"#0F172A"}>
                                                {service.rating ? Number(service.rating).toFixed(1) : "4.9"}
                                            </Text>
                                            <Text fontSize={"13px"} color={"#64748B"} fontWeight={"400"}>
                                                ({service.totalBooking ? `${service.totalBooking} reviews` : "128 reviews"})
                                            </Text>
                                        </Flex>

                                        {/* Price */}
                                        <Text fontSize={"15px"} fontWeight={"700"} color={"#4F46E5"}>
                                            {formatServicePrice(service)}
                                        </Text>
                                    </Flex>

                                    {/* Description (2 lines clamp) */}
                                    <Text
                                        fontSize={"13.5px"}
                                        color={"#64748B"}
                                        lineHeight={"150%"}
                                        lineClamp={2}
                                        minH={"40px"}
                                    >
                                        {service.description ||
                                            "Professional services tailored for everyday needs and special occasions."}
                                    </Text>

                                    {/* Outlined Action Button: See other providers + */}
                                    <Flex
                                        as="button"
                                        onClick={() => routeToPage(service.id)}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        w={"full"}
                                        px={"5"}
                                        py={"2.5"}
                                        rounded={"full"}
                                        border={"1px solid #4F46E5"}
                                        bg={"white"}
                                        color={"#4F46E5"}
                                        fontSize={"13.5px"}
                                        fontWeight={"600"}
                                        cursor={"pointer"}
                                        transition={"all 0.2s ease"}
                                        _hover={{
                                            bg: "#EEF2FF",
                                            borderColor: "#4338CA",
                                            transform: "translateY(-1px)",
                                        }}
                                    >
                                        <Text>See other providers</Text>
                                        <IoAdd size={"18px"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                ) : (
                    /* Events Mode */
                    <Flex
                        ref={scrollRef}
                        w={"full"}
                        overflowX={"auto"}
                        overflowY={"hidden"}
                        scrollBehavior={"smooth"}
                        className="hide-scrollbar"
                        gap={["5", "6", "6"]}
                        py={"2"}
                        px={"1"}
                    >
                        {events.map((item) => (
                            <Flex
                                as="button"
                                onClick={() => routeToPage(item.id)}
                                key={item.id}
                                w={["290px", "320px", "360px"]}
                                flexShrink={0}
                                flexDir={"column"}
                                bg={"white"}
                                rounded={"22px"}
                                overflow={"hidden"}
                                border={"1px solid #E2E8F0"}
                                boxShadow={"0 4px 18px rgba(0, 0, 0, 0.04)"}
                                transition={"all 0.25s ease"}
                                _hover={{
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
                                    borderColor: "#CBD5E1",
                                }}
                            >
                                {/* Card Image with Badges */}
                                <Box w={"full"} h={["200px", "210px", "225px"]} pos={"relative"} overflow={"hidden"}>
                                    <Box position={"absolute"} inset={"0px"}
                                        bg={"rgba(0, 0, 0, 0.2)"} />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        w={"full"}
                                        h={"full"}
                                        objectFit={"cover"}
                                        transition={"transform 0.4s ease"}
                                        _hover={{ transform: "scale(1.04)" }}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = fallbackImage;
                                        }}
                                    />

                                    {/* Category Badge (Top Left) */}
                                    <Box
                                        pos={"absolute"}
                                        top={"3.5"}
                                        left={"3.5"}
                                        px={"3.5"}
                                        py={"1"}
                                        rounded={"full"}
                                        bg={"rgba(255, 255, 255, 0.1)"}
                                        backdropFilter={"blur(6px)"}
                                        color={"#FFF"}
                                        fontSize={"12px"}
                                        fontWeight={"600"}
                                        boxShadow={"0 2px 8px rgba(0, 0, 0, 0.12)"}
                                    >
                                        {item.category}
                                    </Box>

                                    {/* Urgency / Status Badge (Top Right) */}
                                    <Box
                                        pos={"absolute"}
                                        top={"3.5"}
                                        right={"3.5"}
                                        px={"3"}
                                        py={"1"}
                                        rounded={"full"}
                                        fontSize={"11px"}
                                        fontWeight={"700"}
                                        letterSpacing={"0.5px"}
                                        boxShadow={"0 2px 8px rgba(0, 0, 0, 0.2)"}
                                    >
                                        <InterestedUsers users={item?.interestedUsers || []} count={item?.count || 0} size={"xs"} />
                                    </Box>
                                </Box>

                                {/* Card Body */}
                                <Flex flexDir={"column"} p={"5"} flex={"1"} justifyContent={"space-between"} gap={"3.5"}>
                                    <Flex flexDir={"column"} gap={"2"}>
                                        {/* Date & Time */}
                                        <Flex alignItems={"center"} gap={"2"} color={"#4F46E5"}>
                                            <IoCalendarOutline size={"15px"} />
                                            <Text fontSize={"13px"} fontWeight={"600"}>
                                                {item.date}
                                            </Text>
                                        </Flex>

                                        {/* Event Title */}
                                        <Text
                                            fontSize={["16px", "17px", "17.5px"]}
                                            fontWeight={"700"}
                                            lineHeight={"135%"}
                                            color={"#0F172A"}
                                            minH={["auto", "auto", "46px"]}
                                            lineClamp={2}
                                        >
                                            {item.title}
                                        </Text>

                                        {/* Location */}
                                        <Flex alignItems={"center"} gap={"1.5"} color={"#64748B"}>
                                            <Box flexShrink={0}>
                                                <IoLocationOutline size={"15px"} />
                                            </Box>
                                            <Text fontSize={"13px"} fontWeight={"400"} lineClamp={1}>
                                                {item.location}
                                            </Text>
                                        </Flex>

                                        {/* Host Row with Escrow Badge */}
                                        <Flex alignItems={"center"} gap={"2.5"} mt={"1"}>
                                            <Flex
                                                w={"24px"}
                                                h={"24px"}
                                                rounded={"full"}
                                                bg={"#EEF2FF"}
                                                color={"#4F46E5"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                fontSize={"10px"}
                                                fontWeight={"700"}
                                                flexShrink={"0"}
                                            >
                                                {item.hostAvatar}
                                            </Flex>
                                            <Text fontSize={"13px"} fontWeight={"500"} color={"#334155"} lineClamp={1}>
                                                {item.hostName}
                                            </Text>
                                            <Flex
                                                alignItems={"center"}
                                                gap={"1"}
                                                px={"2"}
                                                py={"0.5"}
                                                rounded={"md"}
                                                bg={"#ECFDF5"}
                                                color={"#059669"}
                                                fontSize={"11px"}
                                                fontWeight={"600"}
                                                flexShrink={0}
                                            >
                                                <IoCheckmarkCircle size={"12px"} />
                                                <Text>Escrow Verified</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    {/* Bottom Price & Action Row */}
                                    <Flex
                                        pt={"3.5"}
                                        borderTop={"1px solid"}
                                        borderColor={"#F1F5F9"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        <Flex flexDir={"column"}>
                                            <Text fontSize={"10.5px"} fontWeight={"700"} color={"#94A3B8"} letterSpacing={"0.5px"}>
                                                {item.priceLabel}
                                            </Text>
                                            <Flex alignItems={"baseline"} gap={"1"}>
                                                <Text
                                                    fontSize={["16px", "17px", "18px"]}
                                                    fontWeight={"800"}
                                                    color={item.priceColor || "#0F172A"}
                                                >
                                                    {item.price}
                                                </Text>
                                                {item.priceSub && (
                                                    <Text fontSize={"12px"} color={"#64748B"} fontWeight={"400"}>
                                                        {item.priceSub}
                                                    </Text>
                                                )}
                                            </Flex>
                                        </Flex>

                                        <Flex
                                            as="button"
                                            onClick={() => routeToPage(item.id)}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            bg={item.buttonBg}
                                            color={item.buttonColor}
                                            px={"5"}
                                            py={"2"}
                                            rounded={"full"}
                                            fontSize={"13px"}
                                            fontWeight={"600"}
                                            cursor={"pointer"}
                                            transition={"all 0.2s ease"}
                                            _hover={{
                                                opacity: 0.9,
                                                transform: "scale(1.02)",
                                            }}
                                        >
                                            {item.buttonText}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}
