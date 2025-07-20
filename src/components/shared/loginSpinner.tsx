"use client"
import { Flex, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import ModalLayout from "./modalLayout";
import useCustomTheme from "@/hooks/useTheme";


export default function LogInSpinner() {


    const query = useSearchParams();
    const token = query?.get('token');

    const [open, setOpen] = useState(true)
    const { primaryColor } = useCustomTheme()

    useEffect(() => {
        if (typeof token === "string") {

            setOpen(true)
            // Store token in cookie
            Cookies.set("chase_token", token, {
                path: "/",
                secure: true,
                sameSite: "Lax",
            });

            // Optional: remove token from URL
            window.history.replaceState(null, "/product/events", window.location.pathname);

        }
    }, [token]);

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