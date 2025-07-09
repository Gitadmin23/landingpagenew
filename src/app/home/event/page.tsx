"use client" 
import { EventHeroSection, EventPlansSection, EventHowItWorks } from '@/components/event'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Kiosk() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <EventHeroSection />
            <EventHowItWorks />
            <EventPlansSection />
        </Flex>
    )
}
