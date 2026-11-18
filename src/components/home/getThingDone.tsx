"use client";
import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoStar, IoArrowForward, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuBuilding2, LuStore, LuHandshake } from "react-icons/lu";
import { unsecureHttpService } from "@/helpers/services/httpService";
import { IMAGE_URL } from "@/helpers/services/urls";
import type { IBusiness } from "@/helpers/models/product";
import { textLimit } from "@/helpers/utils/textlimit";

const fallbackServiceImage = "/images/for-professionals.jpg";

const getServiceImageUrl = (img?: string) => {
    if (!img) return fallbackServiceImage;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    const base = IMAGE_URL || "https://test-api.chasescroll.com/resource-api/download/";
    return base.endsWith("/") ? `${base}${img}` : `${base}/${img}`;
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
        if (firstLine.length > 32) {
            return firstLine.slice(0, 32) + "...";
        }
        return firstLine;
    }
    return "Verified Professional";
};

const getServiceSubtitle = (service: IBusiness) => {
    const loc = service.location?.state || service.state || service.address?.state;
    const cat = formatCategory(service.category);
    if (loc) {
        return `${cat} • ${loc}`;
    }
    return cat;
};

const formatServicePrice = (service: IBusiness) => {
    if (!service.price) return "Contact for price";
    const numPrice = Number(service.price);
    if (isNaN(numPrice) || numPrice === 0) return "Free Consultation";
    const formatted = `₦${numPrice.toLocaleString()}`;
    return service.hasFixedPrice ? `From ${formatted}` : `From ${formatted}/hr`;
};

const getServiceQuote = (service: IBusiness) => {
    if (service.description && service.description.trim()) {
        const clean = service.description.trim();
        return clean.length > 150 ? clean.slice(0, 147) + "..." : clean;
    }
    return "Book vetted professionals with transparent pricing and verified client ratings on Chasescroll.";
};

const initialServices: IBusiness[] = [
    {
        id: "srv-1",
        name: "Cinematic Event Videography & Production",
        category: "VIDEOGRAPHER",
        images: ["/images/chinedu-photographer.jpg"],
        price: "150000",
        hasFixedPrice: false,
        description: "Professional multi-camera filming, 4K event coverage, and post-production highlight reels.",
        rating: 4.98,
        totalBooking: 184 as any,
        vendor: { firstName: "Chinedu", lastName: "Okafor", username: "chinedu" } as any,
        location: { state: "Lagos & Abuja" } as any,
    } as IBusiness,
    {
        id: "srv-2",
        name: "Private Gourmet Chef & Catering",
        category: "CHEF",
        images: ["/images/for-professionals.jpg"],
        price: "85000",
        hasFixedPrice: false,
        description: "Bespoke culinary dining experiences, cocktail finger foods, and luxury gala banquet catering.",
        rating: 5.0,
        totalBooking: 92 as any,
        vendor: { firstName: "Chef Julian", lastName: "Rossi", username: "julianrossi" } as any,
        location: { state: "Lagos" } as any,
    } as IBusiness,
    {
        id: "srv-3",
        name: "High-Energy Event Host & MC",
        category: "EVENT_HOST",
        images: ["/images/events/afrobeats-concert.jpg"],
        price: "120000",
        hasFixedPrice: true,
        description: "Engaging, charismatic bilingual MC for corporate galas, high-profile weddings, and award shows.",
        rating: 4.95,
        totalBooking: 140 as any,
        vendor: { firstName: "Tunde", lastName: "Adeyemi", username: "mc_tunde" } as any,
        location: { state: "Lagos" } as any,
    } as IBusiness,
    {
        id: "srv-4",
        name: "Sound Engineering & Live DJ Setup",
        category: "DJ_AND_SOUND",
        images: ["/images/events/tech-summit.jpg"],
        price: "200000",
        hasFixedPrice: true,
        description: "Concert-grade line-array sound systems, wireless mics, and versatile DJ curation for all demographics.",
        rating: 4.88,
        totalBooking: 210 as any,
        vendor: { firstName: "DJ", lastName: "Special", username: "djspecial" } as any,
        location: { state: "Abuja" } as any,
    } as IBusiness,
    {
        id: "srv-5",
        name: "Luxury Event Styling & Floral Decor",
        category: "DECORATOR",
        images: ["/images/events/food-festival.jpg"],
        price: "350000",
        hasFixedPrice: false,
        description: "Transformative floral archways, ambient stage lighting, and luxury table scape design for memorable events.",
        rating: 5.0,
        totalBooking: 76 as any,
        vendor: { firstName: "Amaka", lastName: "Bello", username: "amakabello" } as any,
        location: { state: "Port Harcourt & Lagos" } as any,
    } as IBusiness,
];

export default function GetThingDone() {
    const router = useRouter();
    const [services, setServices] = useState<IBusiness[]>(initialServices);
    const [currentIndex, setCurrentIndex] = useState(0);


    const SHARELINK = process.env.NEXT_PUBLIC_SHAREPAGE_URL

    const routeToPage = (id: string) => {
        window.location.href = `${SHARELINK}/service/${id}`
    }

    useEffect(() => {
        let isMounted = true;
        const fetchLiveServices = async () => {
            try {
                const res = await unsecureHttpService.get("/business-service/search?size=10");
                const items: IBusiness[] = res.data?.content || [];
                if (isMounted && items.length > 0) {
                    // Loop through top 5 live items from endpoint
                    setServices(items.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch live services for GetThingDone:", error);
            }
        };

        fetchLiveServices();
        return () => {
            isMounted = false;
        };
    }, []);

    // Automatically moves on its own continuously every 3.5 seconds
    useEffect(() => {
        if (services.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [services.length, currentIndex]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (services.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (services.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }
    };

    const hubCards = [
        {
            id: "fundraiser",
            isDark: true,
            bg: "#1D4ED8",
            icon: FaHandHoldingHeart,
            iconBg: "rgba(255, 255, 255, 0.18)",
            iconColor: "white",
            title: "Start a fundraiser and bring your dream event to life.",
            desc: "Crowdfund community galas, non-profit initiatives, and alumni homecomings with transparent real-time tracking.",
            linkText: "Fundraiser",
            linkColor: "white",
            link: "/home/fundraising",
        },
        {
            id: "kiosk",
            isDark: false,
            bg: "white",
            icon: LuStore,
            iconBg: "#FFF1E8",
            iconColor: "#EA580C",
            title: "Browse and buy from our Kiosk",
            desc: "Purchase coordinated wedding Aso Ebi fabrics, ceremonial souvenirs, and official event merchandise delivered right to guests.",
            linkText: "Aso Ebi & product Hub",
            linkColor: "#EA580C",
            link: "/home/kiosk",
        },
        {
            id: "rental",
            isDark: false,
            bg: "white",
            icon: LuBuilding2,
            iconBg: "#EEF2FF",
            iconColor: "#4F46E5",
            title: "Rent venues, apartments, and event essentials all in one place.",
            desc: "From high-capacity marquees in Victoria Island to intimate short-let apartments and audio-visual generators.",
            linkText: "Rental space",
            linkColor: "#4F46E5",
            link: "/home/rental",
        },
        {
            id: "service",
            isDark: false,
            bg: "white",
            icon: LuHandshake,
            iconBg: "#E6FFFA",
            iconColor: "#0D9488",
            title: "Create an event and hire top creative talent.",
            desc: "Book vetted MCs, mixologists, security details, and choreographers with verified reviews and escrow milestones.",
            linkText: "Talent marketplace",
            linkColor: "#0D9488",
            link: "/home/service",
        },
    ];

    return (
        <Flex
            w={"full"}
            bg={"white"}
            py={["12", "16", "20"]}
            px={["5", "6", "12"]}
            justifyContent={"center"}
            borderBottom={"1px solid"}
            borderColor={"#F1F5F9"}
        >
            <Flex w={"full"} maxW={"1280px"} flexDir={"column"} gap={["6", "8", "8"]}>
                {/* Header Section */}
                <Box maxW={"720px"}>
                    <Box
                        px={"3.5"}
                        py={"1"}
                        rounded={"full"}
                        bg={"#FFF1E8"}
                        color={"#E05D26"}
                        fontSize={"11px"}
                        fontWeight={"700"}
                        letterSpacing={"0.5px"}
                        w={"fit-content"}
                        textTransform={"uppercase"}
                    >
                        ALL-IN-ONE EVENT ECOSYSTEM
                    </Box>

                    <Text
                        as="h2"
                        fontSize={["28px", "34px", "40px"]}
                        lineHeight={["120%", "120%", "115%"]}
                        fontWeight={"800"}
                        color={"#0F172A"}
                        mt={"2"}
                        letterSpacing={"-0.02em"}
                    >
                        Get things done
                    </Text>

                    <Text
                        fontSize={["14px", "15px", "16px"]}
                        color={"#475569"}
                        mt={"2"}
                        lineHeight={"160%"}
                    >
                        Quick jobs or major overhauls—by working with top independent professionals across Nigeria and beyond.
                    </Text>
                </Box>

                {/* Directory Content: Left Hero Card + Right 2x2 Grid */}
                <Grid
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(12, 1fr)",
                    ]}
                    gap={["5", "6", "6"]}
                    w={"full"}
                    alignItems={"stretch"}
                >
                    {/* Left: Featured Talent Profile Card with Live 5-Service Animated Slider */}
                    <Flex
                        gridColumn={["span 12", "span 12", "span 5"]}
                        bg={"white"}
                        rounded={"24px"}
                        overflow={"hidden"}
                        border={"1px solid #E2E8F0"}
                        boxShadow={"0 4px 20px rgba(0, 0, 0, 0.04)"}
                        flexDir={"column"}
                        justifyContent={"space-between"}
                        pos={"relative"}
                        transition={"all 0.25s ease"}
                        _hover={{
                            transform: "translateY(-4px)",
                            boxShadow: "0 14px 32px rgba(0, 0, 0, 0.08)",
                            borderColor: "#CBD5E1",
                        }}
                    >
                        {/* Persistent Top Navigation Bar: 5-Item Loop Dots & Controls */}
                        {services.length > 1 && (
                            <Flex
                                pos={"absolute"}
                                top={"4"}
                                left={"4"}
                                right={"4"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                zIndex={"10"}
                            >
                                {/* Clickable 5-item indicator dots */}
                                <Flex
                                    gap={"1.5"}
                                    alignItems={"center"}
                                    bg={"rgba(0, 0, 0, 0.45)"}
                                    backdropFilter={"blur(8px)"}
                                    px={"2.5"}
                                    py={"1.5"}
                                    rounded={"full"}
                                >
                                    {services.map((_, idx) => (
                                        <Box
                                            key={idx}
                                            as="button"
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                setCurrentIndex(idx);
                                            }}
                                            w={currentIndex === idx ? "20px" : "6px"}
                                            h={"6px"}
                                            rounded={"full"}
                                            bg={currentIndex === idx ? "#3B82F6" : "rgba(255, 255, 255, 0.55)"}
                                            transition={"all 0.3s ease"}
                                            cursor={"pointer"}
                                            aria-label={`Go to service ${idx + 1}`}
                                        />
                                    ))}
                                </Flex>

                                {/* Prev / Next controls */}
                                <Flex gap={"1.5"} alignItems={"center"}>
                                    <Flex
                                        as="button"
                                        onClick={handlePrev}
                                        w={"30px"}
                                        h={"30px"}
                                        rounded={"full"}
                                        bg={"rgba(0, 0, 0, 0.45)"}
                                        backdropFilter={"blur(8px)"}
                                        color={"white"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        cursor={"pointer"}
                                        transition={"all 0.2s ease"}
                                        _hover={{ bg: "rgba(0, 0, 0, 0.75)", transform: "scale(1.05)" }}
                                        aria-label="Previous service"
                                    >
                                        <IoChevronBack size={"15px"} />
                                    </Flex>
                                    <Flex
                                        as="button"
                                        onClick={handleNext}
                                        w={"30px"}
                                        h={"30px"}
                                        rounded={"full"}
                                        bg={"rgba(0, 0, 0, 0.45)"}
                                        backdropFilter={"blur(8px)"}
                                        color={"white"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        cursor={"pointer"}
                                        transition={"all 0.2s ease"}
                                        _hover={{ bg: "rgba(0, 0, 0, 0.75)", transform: "scale(1.05)" }}
                                        aria-label="Next service"
                                    >
                                        <IoChevronForward size={"15px"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}

                        {/* Slider Carousel Viewport & Moving Track */}
                        <Box w={"full"} overflow={"hidden"}>
                            <Flex
                                w={"full"}
                                transform={`translateX(-${currentIndex * 100}%)`}
                                transition={"transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)"}
                            >
                                {services.map((service, idx) => (
                                    <Flex
                                        key={service.id || idx}
                                        minW={"100%"}
                                        maxW={"100%"}
                                        flexDir={"column"}
                                        flexShrink={0}
                                    >
                                        {/* Photo with Overlay */}
                                        <Box w={"full"} h={["270px", "300px", "320px"]} pos={"relative"} overflow={"hidden"}>
                                            <Image
                                                src={getServiceImageUrl(service.images?.[0])}
                                                alt={getVendorDisplayName(service)}
                                                w={"full"}
                                                h={"full"}
                                                objectFit={"cover"}
                                                objectPosition={"top center"}
                                            />

                                            {/* Dark Gradient Overlay */}
                                            <Box
                                                pos={"absolute"}
                                                bottom={"0px"}
                                                insetX={"0px"}
                                                h={"160px"}
                                                style={{
                                                    background:
                                                        "linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)",
                                                }}
                                            />

                                            {/* Text inside overlay */}
                                            <Flex
                                                pos={"absolute"}
                                                bottom={"4"}
                                                left={"4"}
                                                right={"4"}
                                                flexDir={"column"}
                                                gap={"1"}
                                                zIndex={"2"}
                                            >
                                                <Flex alignItems={"center"} gap={"2"}>
                                                    <Box
                                                        px={"2.5"}
                                                        py={"0.5"}
                                                        rounded={"full"}
                                                        bg={"#3B82F6"}
                                                        color={"white"}
                                                        fontSize={"10.5px"}
                                                        fontWeight={"700"}
                                                        letterSpacing={"0.5px"}
                                                        w={"fit-content"}
                                                    >
                                                        {formatCategory(service.category)}
                                                    </Box>
                                                    <Text fontSize={"10.5px"} color={"rgba(255, 255, 255, 0.85)"} fontWeight={"600"}>
                                                        {idx + 1} of {services.length}
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    fontSize={"20px"}
                                                    fontWeight={"800"}
                                                    color={"white"}
                                                    lineHeight={"120%"}
                                                    mt={"1"}
                                                    overflow={"hidden"}
                                                    textOverflow={"ellipsis"}
                                                    whiteSpace={"nowrap"}
                                                >
                                                    {getVendorDisplayName(service)}
                                                </Text>
                                                <Text
                                                    fontSize={"12px"}
                                                    color={"rgba(255, 255, 255, 0.9)"}
                                                    fontWeight={"500"}
                                                    overflow={"hidden"}
                                                    textOverflow={"ellipsis"}
                                                    whiteSpace={"nowrap"}
                                                >
                                                    {getServiceSubtitle(service)}
                                                </Text>
                                            </Flex>
                                        </Box>

                                        {/* Middle Content */}
                                        <Flex flexDir={"column"} p={"5"} gap={"3"}>
                                            {/* Stats Row */}
                                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                                <Flex alignItems={"center"} gap={"1.5"}>
                                                    <IoStar color={"#D97706"} size={"15px"} />
                                                    <Text fontWeight={"800"} fontSize={"14px"} color={"#0F172A"}>
                                                        {service.rating ? Number(service.rating).toFixed(1) : "4.9"}
                                                    </Text>
                                                    <Text fontSize={"13px"} color={"#64748B"}>
                                                        {service.totalBooking
                                                            ? `(${service.totalBooking} completed gigs)`
                                                            : "(Verified Talent)"}
                                                    </Text>
                                                </Flex>
                                                <Text fontSize={"14px"} fontWeight={"700"} color={"#3B82F6"}>
                                                    {formatServicePrice(service)}
                                                </Text>
                                            </Flex>

                                            {/* Quote */}
                                            <Text
                                                fontSize={"13px"}
                                                color={"#475569"}
                                                lineHeight={"155%"}
                                                mt={"1"}
                                                minH={"42px"}
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                &ldquo;{getServiceQuote(service)}&rdquo;
                                            </Text>
                                        </Flex>
                                        {/* Bottom Action Pill */}
                                        <Box p={"5"} pt={"0"}>
                                            <Flex
                                                as="button"
                                                onClick={() => routeToPage(service?.id)}
                                                w={"full"}
                                                py={"3"}
                                                px={"5"}
                                                rounded={"full"}
                                                border={"1px solid #E2E8F0"}
                                                bg={"white"}
                                                color={"#3B82F6"}
                                                fontWeight={"600"}
                                                fontSize={"13.5px"}
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                                cursor={"pointer"}
                                                transition={"all 0.2s ease"}
                                                _hover={{
                                                    bg: "#F8FAFC",
                                                    borderColor: "#CBD5E1",
                                                }}
                                            >
                                                <Text>Book {textLimit(service.name, 20)}</Text>
                                                <IoArrowForward size={"16px"} />
                                            </Flex>
                                        </Box>
                                    </Flex>
                                ))}
                            </Flex>
                        </Box>

                    </Flex>

                    {/* Right: 2x2 Services & Ecosystem Grid */}
                    <Grid
                        gridColumn={["span 12", "span 12", "span 7"]}
                        templateColumns={[
                            "repeat(1, 1fr)",
                            "repeat(2, 1fr)",
                            "repeat(2, 1fr)",
                        ]}
                        gap={["4", "5", "5"]}
                    >
                        {hubCards.map((c) => {
                            const IconC = c.icon;
                            if (c.isDark) {
                                return (
                                    <Flex
                                        key={c.id}
                                        onClick={() => router.push(c.link)}
                                        cursor={"pointer"}
                                        flexDir={"column"}
                                        justifyContent={"space-between"}
                                        p={["5", "6", "6"]}
                                        rounded={"24px"}
                                        bg={c.bg}
                                        color={"white"}
                                        transition={"all 0.25s ease"}
                                        boxShadow={"0 8px 24px rgba(29, 78, 216, 0.25)"}
                                        _hover={{
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 14px 32px rgba(29, 78, 216, 0.35)",
                                        }}
                                        minH={["210px", "230px", "250px"]}
                                    >
                                        <Flex
                                            w={"44px"}
                                            h={"44px"}
                                            rounded={"12px"}
                                            bg={c.iconBg}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <IconC size={"20px"} color={c.iconColor} />
                                        </Flex>

                                        <Box my={"2"}>
                                            <Text fontSize={["16px", "17px", "18px"]} fontWeight={"700"} lineHeight={"135%"}>
                                                {c.title}
                                            </Text>
                                            <Text fontSize={"12.5px"} opacity={"0.85"} mt={"2"} lineHeight={"150%"}>
                                                {c.desc}
                                            </Text>
                                        </Box>

                                        <Flex alignItems={"center"} gap={"1.5"} fontSize={"13.5px"} fontWeight={"600"}>
                                            <Text>{c.linkText}</Text>
                                            <IoArrowForward size={"15px"} />
                                        </Flex>
                                    </Flex>
                                );
                            }

                            return (
                                <Flex
                                    key={c.id}
                                    onClick={() => router.push(c.link)}
                                    cursor={"pointer"}
                                    flexDir={"column"}
                                    justifyContent={"space-between"}
                                    p={["5", "6", "6"]}
                                    rounded={"24px"}
                                    bg={"white"}
                                    border={"1px solid #E2E8F0"}
                                    transition={"all 0.25s ease"}
                                    boxShadow={"0 4px 18px rgba(0, 0, 0, 0.03)"}
                                    _hover={{
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 14px 30px rgba(0, 0, 0, 0.07)",
                                        borderColor: "#CBD5E1",
                                    }}
                                    minH={["210px", "230px", "250px"]}
                                >
                                    <Flex
                                        w={"44px"}
                                        h={"44px"}
                                        rounded={"12px"}
                                        bg={c.iconBg}
                                        color={c.iconColor}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <IconC size={"20px"} />
                                    </Flex>

                                    <Box my={"2"}>
                                        <Text fontSize={["16px", "17px", "18px"]} fontWeight={"700"} color={"#0F172A"} lineHeight={"135%"}>
                                            {c.title}
                                        </Text>
                                        <Text fontSize={"12.5px"} color={"#64748B"} mt={"2"} lineHeight={"150%"}>
                                            {c.desc}
                                        </Text>
                                    </Box>

                                    <Flex alignItems={"center"} gap={"1.5"} fontSize={"13.5px"} fontWeight={"600"} color={c.linkColor}>
                                        <Text>{c.linkText}</Text>
                                        <IoArrowForward size={"15px"} />
                                    </Flex>
                                </Flex>
                            );
                        })}
                    </Grid>
                </Grid>
            </Flex>
        </Flex>
    );
}
