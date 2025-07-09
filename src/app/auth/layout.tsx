"use client"
import { Box, Image } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter()

    return (
        <Flex w={"full"} height={"100vh"} >
            <Flex w={"full"} h={"full"} display={["none", "none", "none", "flex"]} justifyContent={"center"} alignItems={"center"} position={"relative"} >
                <Image alt='bg' src='/images/loginimg.jpg' objectPosition={"left"} pos={"absolute"} inset={"0px"} h={"full"} objectFit={"cover"} />
                <Image alt='bg' src='/images/bay.png' pos={"relative"} zIndex={"10"} w={"70%"} objectFit={"contain"} />
                <Box pos={"absolute"} inset={"0px"} w={"full"} h={"full"} bg={"black"} opacity={"40%"} />
                <Flex as={"button"} onClick={() => router?.push("/")} pos={"absolute"} top={"12"} color={"white"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"12"} >
                    <IoIosArrowBack size={"20px"} />
                    Home
                </Flex>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} bgColor={"#FCFCFC"} h={"full"} w={"full"} >
                {children}
            </Flex>
        </Flex>
    )
}