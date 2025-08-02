"use client" 
import { LandingPageLayout } from "@/components/shared"
import { useColorMode } from "@/components/ui/color-mode";
import React, { useEffect } from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(()=> {
      if(colorMode === "dark"){
        toggleColorMode()
      }
    }, [])
    return(
      <LandingPageLayout>
        {children}
      </LandingPageLayout>
    )
  }

