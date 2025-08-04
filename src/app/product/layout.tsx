"use client"
import { useColorMode } from "@/components/ui/color-mode";
import { EVENT_PAGE_URL } from "@/helpers/services/urls";
import { useEffect } from "react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const { setColorMode } = useColorMode();

    useEffect(() => {
        setColorMode("light") 
    }, [])

    return (
        <>
            {children}
        </>
    )
}