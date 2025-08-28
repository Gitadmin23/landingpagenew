"use client"
import SignUpForm from "@/components/authComponent/signupForm";
import VerficationForm from "@/components/authComponent/verificationForm";
import { GoogleBtn } from "@/components/shared";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function Signup() {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const query = useSearchParams();

    const eventId = query?.get('eventId');
    const productId = query?.get('productId');
    const create = query?.get('create');

    const clickHandler = () => {
        router?.push(`/auth${eventId ? `?eventId=${eventId}` : ""}${productId ? `?productId=${productId}` : ""}${create ? `?create=${create}` : ""}`)
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"} color={"black"} bgColor={"#FCFCFC"} h={"full"} w={"full"} position={"relative"} >
            <Flex cursor={"pointer"} display={["flex", "flex", "flex", "none"]} onClick={() => router?.push("/")} pos={"absolute"} top={"6"} color={"black"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"6"} >
                <IoIosArrowBack size={"20px"} />
                Home
            </Flex>
            <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"450px"} p={"8"} rounded={"62px"} w={"full"} >
                <Image alt='logo' src='/images/logo.png' />
                <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Join us at Chasescroll</Text>
                <Text fontSize={"14px"} color={"#5C5C5C"} textAlign={"center"} fontWeight={"500"} >Create a memorable event now</Text>
                <GoogleBtn title="Sign in" />
                <Flex mt={"2"} flexDirection={"column"} pos={"relative"} alignItems={"center"} >
                    <Box width={"400px"} height={"1px"} pos={"absolute"} top={"3"} bgColor={"#BCBCBC"} />
                    <Text px={"2"} bg={"white"} pos={"relative"} color={"#BCBCBC"} zIndex={"10"} >OR</Text>
                </Flex>
                <Button onClick={() => setOpen(true)} mt={"4"} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                    <Text color={"white"} textAlign={"center"} fontWeight={"600"} >Create Account</Text>
                </Button>
                <Flex px={"4"} my={"3"} >
                    <Text fontSize={"14px"} color={"#434344"} >By signing up, you agree to the Terms of Service and  Privacy Policy , including Cookie Use.</Text>
                </Flex>
                <Text fontSize={"17px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Already have an account?</Text>
                <Button onClick={clickHandler} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"white"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "white" }} justifyContent={"center"} alignItems={"center"} >
                    <Text color={"#233DF3"} textAlign={"center"} fontWeight={"600"} >Sign in</Text>
                </Button>
            </Flex>
            <SignUpForm open={open} setOpen={setOpen} />
            <VerficationForm open={show} setOpen={setShow} setShow={setOpen} />
        </Flex>
    )
}