"use client";
import React, { useRef } from "react";
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { LuUserPlus, LuClipboardCheck, LuPiggyBank } from "react-icons/lu";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CustomVideo } from "../shared";

export default function AboutEventSection() {
    const { primaryColor } = useCustomTheme();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const { push } = useRouter();

    const perks = [
        {
            icon: LuUserPlus,
            iconBg: "#EEF2FF",
            iconColor: "#4F46E5",
            title: "No cost to join",
            desc: "Register and browse talent profiles, explore curated upcoming events, or list your premier event rentals with zero upfront subscription costs.",
        },
        {
            icon: LuClipboardCheck,
            iconBg: "#FFF1E8",
            iconColor: "#EA580C",
            title: "Request a service and hire top professionals",
            desc: "Finding professionals doesn't have to be a task. Request bespoke catering, sound engineering, photography, or DJ services while creating your event or search straight from our verified directory.",
        },
        {
            icon: LuPiggyBank,
            iconBg: "#EEF2FF",
            iconColor: "#4F46E5",
            title: "Work with the best—without breaking the bank",
            desc: "Chasescroll makes it affordable to focus on your guests. Benefit from lowest marketplace transaction rates, milestone contracts, and guaranteed satisfaction before funds disburse.",
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
            <Flex
                w={"full"}
                maxW={"1280px"}
                flexDir={["column", "column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={["8", "10", "14"]}
            >
                {/* Left Side: Video Container */}
                <Flex
                    w={["full", "full", "46%"]}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box
                        w={"full"}
                        maxW={["360px", "420px", "520px"]}
                        bg={"#F4F6FE"}
                        rounded={["24px", "28px", "32px"]}
                        p={["3", "4", "5"]}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        boxShadow={"0 8px 30px rgba(84, 101, 224, 0.06)"}
                        overflow={"hidden"}
                    >
                        <CustomVideo url="https://youtu.be/jQz3p1z9OLQ" />
                    </Box>
                </Flex>

                {/* Right Side: Headline, Perks Cards, CTA */}
                <Flex
                    ref={ref}
                    w={["full", "full", "54%"]}
                    flexDir={"column"}
                    gap={["5", "6", "6"]}
                >
                    {/* Title */}
                    <Box>
                        <Text
                            as="h2"
                            fontSize={["28px", "32px", "38px"]}
                            lineHeight={["120%", "120%", "115%"]}
                            fontWeight={"800"}
                            color={"#0F172A"}
                            letterSpacing={"-0.02em"}
                        >
                            Up your <span style={{ color: primaryColor }}>event</span> game, it&apos;s easy.
                        </Text>
                    </Box>

                    {/* Perks Cards */}
                    <Flex flexDir={"column"} gap={"3.5"}>
                        {perks.map((p, idx) => {
                            const IconC = p.icon;
                            return (
                                <Flex
                                    key={idx}
                                    p={["4", "4.5", "5"]}
                                    rounded={"18px"}
                                    bg={"white"}
                                    border={"1px solid"}
                                    borderColor={"#E2E8F0"}
                                    alignItems={"flex-start"}
                                    gap={"4"}
                                    boxShadow={"0 2px 10px rgba(0, 0, 0, 0.02)"}
                                    transition={"all 0.2s ease"}
                                    _hover={{
                                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
                                        borderColor: "#CBD5E1",
                                    }}
                                >
                                    <Flex
                                        w={"42px"}
                                        h={"42px"}
                                        rounded={"12px"}
                                        bg={p.iconBg}
                                        color={p.iconColor}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        flexShrink={"0"}
                                    >
                                        <IconC size={"20px"} />
                                    </Flex>
                                    <Flex flexDir={"column"} gap={"1"}>
                                        <Text fontSize={["15px", "16px", "16.5px"]} fontWeight={"700"} color={"#0F172A"}>
                                            {p.title}
                                        </Text>
                                        <Text fontSize={["12.5px", "13px", "13.5px"]} color={"#475569"} lineHeight={"155%"}>
                                            {p.desc}
                                        </Text>
                                    </Flex>
                                </Flex>
                            );
                        })}
                    </Flex>

                    {/* Bottom CTA Row with Trust Badge */}
                    <Flex
                        alignItems={["flex-start", "center", "center"]}
                        flexDir={["column", "row", "row"]}
                        gap={["3", "4", "5"]}
                        pt={"2"}
                    >
                        <Flex
                            as="button"
                            onClick={() => push("/auth/signup")}
                            alignItems={"center"}
                            justifyContent={"center"}
                            px={"7"}
                            py={"3.5"}
                            rounded={"full"}
                            bg={primaryColor}
                            color={"white"}
                            fontSize={"14px"}
                            fontWeight={"600"}
                            cursor={"pointer"}
                            boxShadow={"0 8px 24px rgba(84, 101, 224, 0.35)"}
                            transition={"all 0.2s ease"}
                            _hover={{
                                opacity: 0.92,
                                transform: "translateY(-1px)",
                            }}
                            whiteSpace={"nowrap"}
                        >
                            Sign Up now for free
                        </Flex>

                        <Flex alignItems={"center"} gap={"1.5"} color={"#64748B"}>
                            <IoCheckmarkCircleOutline color={"#059669"} size={"18px"} />
                            <Text fontSize={["12px", "12.5px", "13px"]} fontWeight={"500"}>
                                Instant access to 10k+ verified listings
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
