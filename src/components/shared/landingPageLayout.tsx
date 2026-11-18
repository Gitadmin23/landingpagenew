"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import FooterLandingPage from "./footer";
import HomeNavbar from "./navbar";

interface IProps {
    children: React.ReactNode;
}

export default function LandingPageLayout({ children }: IProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [yaxis, setYaxis] = useState(0);

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            setYaxis(scrollRef.current.scrollTop);
        } else if (typeof window !== "undefined") {
            setYaxis(window.scrollY);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
            // Initial check
            handleScroll();
            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        } else if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <Box
            w={"full"}
            h={"100vh"}
            bgColor={"white"}
            color={"black"}
            pos={"relative"}
            overflow={"hidden"}
        >
            <HomeNavbar yaxis={yaxis} />
            <Flex
                ref={scrollRef}
                w={"full"}
                h={"100vh"}
                flexDirection={"column"}
                overflowX={"hidden"}
                overflowY={"auto"}
                scrollBehavior={"smooth"}
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <Box as="main" w={"full"} flex={"1"}>
                    {children}
                </Box>
                <FooterLandingPage />
            </Flex>
        </Box>
    );
}
