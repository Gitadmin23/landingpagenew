"use client"
import { GoogleIcon } from "@/svg";
import { Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "./modalLayout";
import useGoogle from "@/hooks/useGoogle";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CustomInput } from ".";
import httpService from "@/helpers/services/httpService";
import { useMutation } from "@tanstack/react-query";

interface IProps {
    title?: string
}

export default function GoogleBtn({
    title
}: IProps) {

    const { signInWithGoogle, checking, signInPending, open, formik, editProfile } = useGoogle()
    const [userNameCheck, setUserNameCheck] = useState("")

    const { data: session, status } = useSession();

    const token: any = session

    const handleGoogleLogin = () => {
        signIn('google'); // starts Google sign-in flow
    };

    useEffect(() => {
        if (token?.token?.idToken) {
            signInWithGoogle(token?.token?.idToken)
        }
    }, [status])


    const checkUserName = useMutation({
        mutationFn: () => httpService.get(`/auth/username-check`, {
            params: {
                username: formik.values.username
            }
        }),
        onSuccess: (data) => {
            setUserNameCheck(data?.data?.message);
        },
        onError: (error: any) => {

        }
    })

    useEffect(() => {
        if ((formik.values.username + "")?.length >= 2) {
            checkUserName?.mutate()
        } else {
            setUserNameCheck("")
        }
    }, [formik.values.username])


    return (
        <>
            <Button onClick={handleGoogleLogin} loading={signInPending || checking} as={"button"} mt={"4"} h={"50px"} w={"full"} bgColor={"#F7F7F7"} rounded={"32px"} gap={"3"} justifyContent={"center"} alignItems={"center"} >
                <GoogleIcon />
                <Text fontSize={"14px"} color={"#111111"} textAlign={"center"} fontWeight={"500"} >{title ? title : "Signup"} with Google</Text>
            </Button>
            <ModalLayout trigger={true} open={open} >
                <Flex gap={"2"} width={"full"} flexDir={"column"} mt={"3"} px={"4"} pb={"5"} >
                    <Text textAlign={"center"} fontWeight={"700"} fontSize={"24px"} mb={"6"} >SetUp Account Information</Text> 
                    <CustomInput label="FirstName" name='firstName' type='text' placeholder='Enter your First Name' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                    <CustomInput label="LastName" name='lastName' type='text' placeholder='Enter your Last Name' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                    <CustomInput label="Username" name='username' type='text' placeholder='Enter your Username' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                    {userNameCheck && (
                        <Text mt={"-2"} ml={"auto"} color={userNameCheck?.includes("exists") ? "red" : "#5D70F9"} fontSize={"12px"} fontWeight={"500"} >{userNameCheck}</Text>
                    )}
                    <CustomInput label="phone" name='phone' phone={true} type="tel" placeholder='' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                    <Button loading={editProfile?.isPending} onClick={() => formik.handleSubmit()} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"white"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "white" }} justifyContent={"center"} alignItems={"center"} >
                        <Text color={"#233DF3"} textAlign={"center"} fontWeight={"600"} >Submit</Text>
                    </Button>
                </Flex>
            </ModalLayout>
        </>
    )

}
