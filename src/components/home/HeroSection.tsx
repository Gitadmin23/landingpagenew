"use client";
import useCustomTheme from "@/hooks/useTheme";
import { NewDonationIcon, NewEventIcon, RentalIcon, ServiceIcon, StoreIcon } from "@/svg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { CustomButton } from "../shared";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const reftwo = useRef<HTMLDivElement>(null);
    const isInViewtwo = useInView(reftwo, { once: true });

    const [active, setActive] = useState("event");
    const { primaryColor } = useCustomTheme();
    const { push } = useRouter();

    const clickHandler = (item: "kiosks" | "services" | "rentals" | "event" | "donation") => {
        if (item === "event") {
            push(`/product`);
        } else if (item === "donation") {
            push(`/product/fundraising`);
        } else {
            push(`/product/${item}`);
        }
    };

    const categories = [
        { id: "event", label: "Event", icon: NewEventIcon, link: "event" },
        { id: "kiosk", label: "Kiosk", icon: StoreIcon, link: "kiosks" },
        { id: "service", label: "Services", icon: ServiceIcon, link: "services" },
        { id: "rental", label: "Rentals", icon: RentalIcon, link: "rentals" },
        { id: "fundraising", label: "Fundraising", icon: NewDonationIcon, link: "donation" },
    ];

    const partners = [
        {
            name: "Babcock University",
            logo: "/images/partners/babcock.png",
            height: ["24px", "28px", "32px"],
        },
        {
            name: "Founder Institute",
            logo: "/images/partners/founder-institute.png",
            height: ["26px", "30px", "34px"],
        },
        {
            name: "University of Lagos",
            logo: "/images/partners/unilag.png",
            height: ["24px", "28px", "32px"],
        },
        {
            name: "Bells University",
            logo: "/images/partners/bells.png",
            height: ["24px", "28px", "32px"],
        },
        {
            name: "LinkedIn Local Nigeria",
            logo: "/images/partners/linkedin-local.png",
            height: ["20px", "22px", "26px"],
        },
    ];

    return (
        <Flex w={"full"} flexDir={"column"} pos={"relative"} bg={"#05081E"}>
            {/* Hero Main Area */}
            <Flex
                w={"full"}
                minH={["650px", "700px", "760px"]}
                color={"white"}
                pos={"relative"}
                overflow={"hidden"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {/* Background Artwork Image */}
                <Box pos={"absolute"} inset={"0px"} zIndex={"1"}>
                    <Image
                        src="/images/hero/naija-hero-bg.png"
                        alt="Hero Naija Vibes Background"
                        w={"full"}
                        h={"full"}
                        objectFit={"cover"}
                        objectPosition={["center center", "center center", "top"]}
                    />
                </Box>

                {/* Subtle Gradient Overlay */}
                <Box
                    pos={"absolute"}
                    inset={"0px"}
                    zIndex={"2"}
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.28) 40%, rgba(0, 0, 0, 0.55) 100%)",
                    }}
                />

                {/* Main Content Container */}
                <Flex
                    w={"full"}
                    maxW={"1280px"}
                    px={["5", "6", "12"]}
                    pt={["95px", "105px", "130px"]}
                    pb={["35px", "45px", "65px"]}
                    flexDir={"column"}
                    alignItems={["flex-start", "flex-start", "center"]}
                    textAlign={["left", "left", "center"]}
                    zIndex={"10"}
                    pos={"relative"}
                >
                    {/* Headline */}
                    <Text
                        ref={ref}
                        as="h1"
                        style={{
                            transform: isInView ? "none" : "translateY(-20px)",
                            opacity: isInView ? 1 : 0,
                            transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
                        }}
                        maxW={"960px"}
                        fontSize={["32px", "42px", "54px"]}
                        lineHeight={["120%", "120%", "64px"]}
                        fontWeight={"800"}
                        letterSpacing={"-0.02em"}
                        color={"white"}
                    >
                        Connecting event hosts in need to professionals who deliver.
                    </Text>

                    {/* Subtitle */}
                    <Text
                        maxW={"800px"}
                        fontSize={["14px", "15px", "18px"]}
                        lineHeight={["150%", "155%", "160%"]}
                        color={"rgba(255, 255, 255, 0.95)"}
                        fontWeight={"400"}
                        mt={["3", "3.5", "4"]}
                    >
                        Find vetted talent, book verified event spaces, shop ceremonial Aso Ebi, and run seamless escrow-protected transactions across Africa.
                    </Text>

                    {/* Mobile Only: CTA Action Buttons (Get started & Login) */}
                    {/* <Flex
                        display={["flex", "flex", "none"]}
                        w={"full"}
                        alignItems={"center"}
                        gap={"3"}
                        mt={"4"}
                    >
                        <CustomButton
                            onClick={() => push("/auth/signup")}
                            text={"Get started"}
                            height={"48px"}
                            fontSize={"15px"}
                            backgroundColor={primaryColor}
                            borderRadius={"999px"}
                            color={"white"}
                            flex={"1.4"}
                        />
                        <CustomButton
                            onClick={() => push("/auth")}
                            text={"Login"}
                            height={"48px"}
                            fontSize={"15px"}
                            backgroundColor={"transparent"}
                            borderWidth={"1px"}
                            borderColor={"rgba(255, 255, 255, 0.8)"}
                            borderRadius={"999px"}
                            color={"white"}
                            flex={"1"}
                        />
                    </Flex> */}

                    {/* Desktop Category Filter Bar */}
                    <Flex
                        ref={reftwo}
                        style={{
                            transform: isInViewtwo ? "none" : "translateY(+20px)",
                            opacity: isInViewtwo ? 1 : 0,
                            transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
                        }}
                        display={["none", "none", "flex"]}
                        w={"fit-content"}
                        py={"1.5"}
                        px={"2"}
                        bg={"rgba(0, 0, 0, 0.45)"}
                        backdropFilter={"blur(20px)"}
                        rounded={"full"}
                        border={"1px solid rgba(255, 255, 255, 0.2)"}
                        gap={"3"}
                        alignItems={"center"}
                        mt={"8"}
                    >
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            const isSelected = active === cat.id;
                            return (
                                <Flex
                                    key={cat.id}
                                    as="button"
                                    onClick={() => {
                                        setActive(cat.id);
                                        clickHandler(cat.link as any);
                                    }}
                                    alignItems={"center"}
                                    gap={"2"}
                                    px={"5"}
                                    py={"2.5"}
                                    rounded={"full"}
                                    bg={isSelected ? primaryColor : "transparent"}
                                    color={"white"}
                                    transition={"all 0.2s ease"}
                                    cursor={"pointer"}
                                    whiteSpace={"nowrap"}
                                    _hover={{
                                        bg: isSelected ? primaryColor : "rgba(255, 255, 255, 0.15)",
                                    }}
                                >
                                    <IconComponent color={"white"} />
                                    <Text fontSize={"14px"} fontWeight={"600"}>
                                        {cat.label}
                                    </Text>
                                </Flex>
                            );
                        })}
                    </Flex>

                    {/* Mobile Category Pills (2 rows matching the mobile design) */}
                    <Flex
                        display={["flex", "flex", "none"]}
                        flexDir={"column"}
                        gap={"2.5"}
                        w={"full"}
                        mt={"4"}
                    >
                        {/* Row 1: Event, Kiosk, Services */}
                        <Flex gap={"2"} w={"full"}>
                            {categories.slice(0, 3).map((cat) => {
                                const IconComponent = cat.icon;
                                const isSelected = active === cat.id;
                                return (
                                    <Flex
                                        key={cat.id}
                                        as="button"
                                        onClick={() => {
                                            setActive(cat.id);
                                            clickHandler(cat.link as any);
                                        }}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        gap={"1.5"}
                                        px={"3"}
                                        py={"2"}
                                        rounded={"full"}
                                        bg={isSelected ? primaryColor : "rgba(0, 0, 0, 0.35)"}
                                        backdropFilter={"blur(16px)"}
                                        border={isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.2)"}
                                        color={"white"}
                                        fontSize={"13px"}
                                        fontWeight={"600"}
                                        flex={"1"}
                                        whiteSpace={"nowrap"}
                                    >
                                        <IconComponent color={"white"} />
                                        <Text>{cat.label}</Text>
                                    </Flex>
                                );
                            })}
                        </Flex>

                        {/* Row 2: Rentals, Fundraising */}
                        <Flex gap={"2"} w={"full"}>
                            {categories.slice(3, 5).map((cat) => {
                                const IconComponent = cat.icon;
                                const isSelected = active === cat.id;
                                return (
                                    <Flex
                                        key={cat.id}
                                        as="button"
                                        onClick={() => {
                                            setActive(cat.id);
                                            clickHandler(cat.link as any);
                                        }}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        gap={"1.5"}
                                        px={"4"}
                                        py={"2"}
                                        rounded={"full"}
                                        bg={isSelected ? primaryColor : "rgba(0, 0, 0, 0.35)"}
                                        backdropFilter={"blur(16px)"}
                                        border={isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.2)"}
                                        color={"white"}
                                        fontSize={"13px"}
                                        fontWeight={"600"}
                                        flex={"1"}
                                        whiteSpace={"nowrap"}
                                    >
                                        <IconComponent color={"white"} />
                                        <Text>{cat.label}</Text>
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Flex>

                    {/* Mobile LinkedIn Local Nigeria Card (at bottom of content) */}
                    <Flex
                        display={["flex", "flex", "none"]}
                        w={"full"}
                        mt={"5"}
                        p={"3.5"}
                        rounded={"20px"}
                        bg={"rgba(0, 0, 0, 0.55)"}
                        backdropFilter={"blur(16px)"}
                        border={"1px solid rgba(255, 255, 255, 0.15)"}
                        alignItems={"center"}
                        gap={"3"}
                    >
                        <Box
                            w={"46px"}
                            h={"46px"}
                            rounded={"full"}
                            overflow={"hidden"}
                            border={"2px solid #5465E0"}
                            flexShrink={"0"}
                        >
                            <Image
                                src="/images/newlink.png"
                                alt="LinkedIn Local Team"
                                w={"full"}
                                h={"full"}
                                objectFit={"cover"}
                            />
                        </Box>
                        <Text fontSize={"12px"} color={"white"} lineHeight={"140%"} fontWeight={"500"}>
                            Chasescroll is the official ticketing partner for LinkedIn local Nigeria events
                        </Text>
                    </Flex>
                </Flex>

                {/* Desktop LinkedIn Local Nigeria Badge (Positioned at the right) */}
                <Flex
                    display={["none", "none", "flex"]}
                    pos={"absolute"}
                    right={"35px"}
                    bottom={"25px"}
                    zIndex={"20"}
                    flexDir={"column"}
                    alignItems={"center"}
                    maxW={"280px"}
                >
                    <Flex pos={"relative"} alignItems={"center"} justifyContent={"center"}>
                        {/* Blue angled accent stripe behind circle */}
                        <Box
                            pos={"absolute"}
                            w={"130px"}
                            h={"36px"}
                            bg={"#5465E0"}
                            transform={"rotate(-10deg)"}
                            right={"-24px"}
                            rounded={"md"}
                            zIndex={"1"}
                        />
                        {/* Circular Team Photo */}
                        <Box
                            w={"140px"}
                            h={"140px"}
                            rounded={"full"}
                            overflow={"hidden"}
                            border={"4px solid #5465E0"}
                            pos={"relative"}
                            zIndex={"2"}
                            boxShadow={"0 10px 25px rgba(0, 0, 0, 0.45)"}
                        >
                            <Image
                                src="/images/newlink.png"
                                alt="LinkedIn Local Nigeria Team"
                                w={"full"}
                                h={"full"}
                                objectFit={"cover"}
                            />
                        </Box>
                    </Flex>

                    {/* Frosted text pill directly below badge */}
                    <Box
                        mt={"3"}
                        px={"4"}
                        py={"2.5"}
                        rounded={"16px"}
                        bg={"rgba(0, 0, 0, 0.65)"}
                        backdropFilter={"blur(12px)"}
                        border={"1px solid rgba(255, 255, 255, 0.15)"}
                        textAlign={"center"}
                        zIndex={"10"}
                        boxShadow={"0 8px 20px rgba(0, 0, 0, 0.3)"}
                    >
                        <Text fontSize={"11.5px"} color={"white"} lineHeight={"140%"}>
                            Chasescroll is the official ticketing partner for LinkedIn local Nigeria events
                        </Text>
                    </Box>
                </Flex>
            </Flex>

            {/* Partner / Trust Strip */}
            <Flex
                w={"full"}
                bg={"white"}
                borderBottom={"1px solid"}
                borderColor={"#F1F5F9"}
                py={["4", "4", "5"]}
                px={["4", "6", "12"]}
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
            >
                <Flex
                    w={"full"}
                    maxW={"1280px"}
                    flexDir={["column", "row", "row"]}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={["4", "6", "8"]}
                >
                    {/* Left: Trusted Partner Indicator */}
                    <Flex alignItems={"center"} gap={"2.5"} flexShrink={"0"}>
                        <Box w={"10px"} h={"10px"} rounded={"full"} bg={"#00B074"} flexShrink={"0"} />
                        <Text
                            fontSize={["12px", "12px", "13px"]}
                            fontWeight={"700"}
                            color={"#64748B"}
                            letterSpacing={"0.8px"}
                            textTransform={"uppercase"}
                            whiteSpace={"nowrap"}
                        >
                            TRUSTED PARTNER
                        </Text>
                    </Flex>

                    {/* Logos Container */}
                    <Flex
                        w={["full", "auto", "auto"]}
                        flex={"1"}
                        alignItems={"center"}
                        justifyContent={["space-between", "space-evenly", "space-evenly"]}
                        gap={["5", "8", "10"]}
                        overflowX={"auto"}
                        className="hide-scrollbar"
                        py={"1"}
                        pl={["0", "6", "10"]}
                    >
                        {partners.map((p, idx) => (
                            <Flex
                                key={idx}
                                flexShrink={"0"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                h={["32px", "36px", "40px"]}
                                opacity={"0.9"}
                                _hover={{ opacity: "1", transform: "scale(1.04)" }}
                                transition={"all 0.2s ease"}
                            >
                                <Image
                                    src={p.logo}
                                    alt={p.name}
                                    h={p.height}
                                    w={"auto"}
                                    objectFit={"contain"}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
