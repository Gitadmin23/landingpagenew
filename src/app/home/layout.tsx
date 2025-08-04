"use client" 
import { LandingPageLayout } from "@/components/shared" 
import React from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
      <LandingPageLayout>
        {children}
      </LandingPageLayout>
    )
  }

