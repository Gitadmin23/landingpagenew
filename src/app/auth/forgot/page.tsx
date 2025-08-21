"use client" 
import { CustomButton, CustomInput } from "@/components/shared";
import VerficationForm from "@/components/authComponent/verificationForm";
import useAuth from "@/hooks/useAuth";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Page() {

    const { formikEmail, formikPassword, sendingVerify, loadingPassword } = useAuth()
    const query = useSearchParams();
    const code = query?.get('code');
    const [ open, setOpen ] = useState(false) 

    return (
        <Flex w={"full"} h={"screen"} color={"black"} justifyContent={"center"} alignItems={"center"} >
            {!code && (
                <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} color={"black"} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"450px"} p={"8"} rounded={"62px"} w={"full"} >
                    <Image alt='logo' src='/images/logo.png' />
                    <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Forgot Password</Text>
                    <CustomInput value={formikEmail.values} setValue={formikEmail.setFieldValue} errors={formikEmail?.errors} touched={formikEmail?.touched} placeholder="Enter Email" name="email" />
                    <CustomButton text={"Submit"} isLoading={sendingVerify} onClick={()=> formikEmail?.handleSubmit()} borderRadius={"full"} mt={"4"} />
                </Flex>
            )}
            {code && (
                <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"450px"} p={"8"} rounded={"62px"} w={"full"} >
                    <Image alt='logo' src='/images/logo.png' />
                    <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Change Password</Text>
                    <CustomInput value={formikPassword.values} setValue={formikPassword.setFieldValue} errors={formikPassword?.errors} touched={formikPassword?.touched} placeholder="Enter your password" isPassword={true} name="password" />
                    <CustomInput value={formikPassword.values} setValue={formikPassword.setFieldValue} errors={formikPassword?.errors} touched={formikPassword?.touched} placeholder="Confirm password" isPassword={true} name="confirmPassword" />
                    <CustomButton text={"Submit"} isLoading={loadingPassword} onClick={()=> formikPassword?.handleSubmit()} borderRadius={"full"} mt={"4"} />
                </Flex>
            )}
            <VerficationForm open={open} setOpen={setOpen} />
        </Flex>
    )
}