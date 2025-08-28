"use client"
import { Flex, Spinner } from "@chakra-ui/react"; 
import { useEffect } from "react";
import Cookies from "js-cookie"
import ModalLayout from "./modalLayout";
import { signOut, useSession } from "next-auth/react";
import useCustomTheme from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { MutatingDots } from 'react-loader-spinner'


export default function LogOutSpinner() { 

    const { primaryColor } = useCustomTheme()

    const { status } = useSession();
    const router = useRouter()

    useEffect(()=> {
        if(status === "unauthenticated"){
            router.push("/auth")
        } else {
            signOut()
    
            Cookies.set("chase_token", "");
        }
    }, []) 

    return (
        <Flex w={"full"} h={"100vh"} bgColor={"white"} >
            <ModalLayout size="md" open={true} trigger={true} >
                <Flex bgColor={"white"} w={"full"} h={"40vh"} justifyContent={"center"} alignItems={"center"} >
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color={primaryColor}
                    secondaryColor={primaryColor}
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                </Flex>
            </ModalLayout>
        </Flex>
    )
}