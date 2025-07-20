"use client"
import { Flex, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import ModalLayout from "./modalLayout";
import { signOut, useSession } from "next-auth/react";
import useCustomTheme from "@/hooks/useTheme";


export default function LogOutSpinner() {

    const [ open, setOpen ] = useState()

    const { primaryColor } = useCustomTheme()

    useEffect(()=> {

    }, [])

    return (
        <Flex >
            <ModalLayout size="md" open={open} >
                <Flex w={"full"} h={"40vh"} justifyContent={"center"} alignItems={"center"} >
                    <Spinner size={"lg"} color={primaryColor} />
                </Flex>
            </ModalLayout>
        </Flex>
    )
}