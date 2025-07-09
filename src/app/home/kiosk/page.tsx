"use client" 
import { KioskHeroSection, KioskHowItWorks, KioskPlansSection } from '@/components/kiosk'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Kiosk() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <KioskHeroSection />
            <KioskHowItWorks />
            <KioskPlansSection />
        </Flex>
    )
}
