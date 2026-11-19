"use client";
import React, { useRef } from "react";
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { CustomButton } from "../shared";

export default function ServiceProvider() {
    const { primaryColor } = useCustomTheme();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const { push } = useRouter();

    return (
        <Flex
            w={"full"}
            bg={"#060919"}
            pos={"relative"}
            overflow={"hidden"}
            py={["12", "14", "16", "20"]}
            px={["5", "6", "10", "16"]}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {/* Background Image on Right Half */}
            <Box
                pos={"absolute"}
                top={"0"}
                right={"0"}
                bottom={"0"}
                w={["full", "full", "60%"]}
                zIndex={"1"}
                pointerEvents={"none"}
            >
                <Image
                    src="/images/hero/serviceprovided.jpg"
                    alt="Payments background"
                    w={"full"}
                    h={"full"}
                    objectFit={"cover"}
                    objectPosition={["center", "center", "center 40%"]}
                />
                {/* Desktop Gradient Overlay: Dark on left, fades to transparent on credit card photo */}
                <Box
                    pos={"absolute"}
                    inset={"0"}
                    display={["none", "none", "block"]}
                    style={{
                        background:
                            "linear-gradient(90deg, #060919 0%, #060919 25%, rgba(6, 9, 25, 0.88) 55%, rgba(6, 9, 25, 0.35) 100%)",
                    }}
                />
                {/* Mobile Gradient Overlay */}
                <Box
                    pos={"absolute"}
                    inset={"0"}
                    display={["block", "block", "none"]}
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(6, 9, 25, 0.95) 0%, rgba(6, 9, 25, 0.88) 100%)",
                    }}
                />
            </Box>

            {/* Top-Right Decorative Shapes */}
            <Box
                pos={"absolute"}
                top={"0"}
                right={"-15px"}
                w={["140px", "180px", "220px"]}
                h={["30px", "36px", "42px"]}
                bg={primaryColor || "#5465E4"}
                transform={"rotate(-7deg)"}
                zIndex={"2"}
                pointerEvents={"none"}
            />
            <Box
                pos={"absolute"}
                top={["24px", "30px", "36px"]}
                right={"0"}
                w={["100px", "130px", "150px"]}
                h={["36px", "44px", "52px"]}
                bg={"#F1F5F9"}
                zIndex={"2"}
                pointerEvents={"none"}
            />

            {/* Content Container */}
            <Flex
                ref={ref}
                w={"full"}
                maxW={"1280px"}
                zIndex={"5"}
                pos={"relative"}
                flexDir={["column", "column", "row"]}
                justifyContent={"space-between"}
                alignItems={["flex-start", "flex-start", "center"]}
                gap={["8", "10", "12"]}
            >
                {/* Left Column: Heading + Paragraph 1 & 2 */}
                <Flex
                    w={["full", "full", "52%"]}
                    flexDir={"column"}
                >
                    <Text
                        as="h2"
                        fontSize={["26px", "30px", "36px", "40px"]}
                        lineHeight={["120%", "120%", "125%"]}
                        fontWeight={"700"}
                        color={"white"}
                        letterSpacing={"-0.02em"}
                        mb={["4", "5", "6"]}
                    >
                        How Payments Work for Service Providers
                    </Text>

                    <Text
                        fontSize={["13px", "13.5px", "14px"]}
                        color={"rgba(255, 255, 255, 0.82)"}
                        lineHeight={"165%"}
                        maxW={"520px"}
                    >
                        Customers pay the full service amount upfront into the vendor&apos;s secure escrow system. After the service is completed, they must click the &quot;Approve&quot; button to confirm successful delivery. Once approved, the funds are automatically transferred to the vendor&apos;s wallet for withdrawal to their preferred bank account.
                    </Text>

                    <Text
                        fontSize={["13px", "13.5px", "14px"]}
                        color={"rgba(255, 255, 255, 0.82)"}
                        lineHeight={"165%"}
                        maxW={"520px"}
                        mt={["4", "5", "6"]}
                    >
                        If a customer is disrespectful, acts irresponsibly, or intentionally delays the project without prior notice, we&apos;ve got your back—we&apos;ll release your full payment to you, hassle-free.
                    </Text>
                </Flex>

                {/* Right Column: Evidence advice + CTA button */}
                <Flex
                    w={["full", "full", "44%"]}
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                    pt={["0", "0", "8"]}
                >
                    <Text
                        fontSize={["13px", "13.5px", "14px"]}
                        color={"rgba(255, 255, 255, 0.85)"}
                        lineHeight={"165%"}
                        maxW={"420px"}
                    >
                        To ensure a smooth resolution, be sure to take photos or videos as evidence. With us, you don&apos;t have to worry about losing your money or dealing with subpar customers.
                    </Text>

                    <Box mt={["5", "6", "7"]} w={["full", "fit-content", "fit-content"]}>
                        <CustomButton
                            onClick={() => push("/auth?create=services")}
                            text={"Find Opportunities"}
                            px={"7"}
                            height={"44px"}
                            fontSize={"14px"}
                            backgroundColor={primaryColor || "#5465E4"}
                            borderRadius={"999px"}
                            color={"white"}
                            width={["full", "fit-content", "fit-content"]}
                        />
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}
