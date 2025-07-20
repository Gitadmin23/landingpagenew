"use client"
import { Checkbox, Image } from "@chakra-ui/react";

import { Box, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";

import { Flex } from "@chakra-ui/react";
import { CustomButton, CustomInput, GoogleBtn } from "@/components/shared";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AuthPage() {

    const { signInPending, formik } = useAuth()
    const router = useRouter()

    return (
        <Flex justifyContent={"center"} alignItems={"center"} color={"black"} bgColor={"#FCFCFC"} h={"full"} w={"full"} position={"relative"} >
            <Flex as={"button"} display={["flex", "flex", "flex", "none"]} onClick={() => router?.push("/")} pos={"absolute"} top={"6"} color={"black"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"6"} >
                <IoIosArrowBack size={"20px"} />
                Home
            </Flex>
            <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"450px"} p={"8"} rounded={"62px"} w={"full"} >
                <Image alt='logo' src='/images/logo.png' />
                <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Welcome To Chasescroll</Text>
                <Text fontSize={"14px"} color={"#5C5C5C"} textAlign={"center"} fontWeight={"500"} >{`We're thrilled to work with you on your event projects. Join us today.`}</Text>
                <GoogleBtn title="Sign in" />
                <Flex mt={"2"} flexDirection={"column"} pos={"relative"} alignItems={"center"} >
                    <Box maxW={"400px"} w={"70vw"} height={"1px"} pos={"absolute"} top={"3"} bgColor={"#BCBCBC"} />
                    <Text px={"2"} bg={"white"} pos={"relative"} color={"#BCBCBC"} zIndex={"10"} >OR</Text>
                </Flex>
                <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} > 
                    <CustomInput label="Email/Username" name='username' type='text' placeholder='Enter your Email or Username' value={formik?.values} setValue={formik?.setFieldValue} />
                </Flex>
                <Flex flexDir={"column"} gap={"1"} mt={"3"} w={"full"} > 
                    <CustomInput label="Password" name='password' type='password' placeholder='Enter your password' value={formik?.values} setValue={formik?.setFieldValue} />
                </Flex>
                <Flex justifyContent={"space-between"} w={"full"} mt={"3"} fontSize={"12px"} > 
                    <Checkbox.Root variant={"solid"} size={"sm"} color={"#233DF3"} >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>Remember me</Checkbox.Label>
                    </Checkbox.Root>
                    <Text onClick={() => router.push("/auth/forgotpassword")} as={"button"} color={"#233DF3"} >Forgot Password</Text>
                </Flex> 
                <CustomButton isLoading={signInPending} onClick={()=> formik.handleSubmit()} borderRadius={"9999px"} mt={"4"} height={"50px"} text={"Login"} />
                <Text fontSize={"14px"} mt={"4"} >{`Don't have account ?`} <span style={{ color: "#233DF3", fontWeight: "600" }} role='button' onClick={() => router?.push("/auth/signup")} >Sign Up</span></Text>
            </Flex>
        </Flex>
    )
}