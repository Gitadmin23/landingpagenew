"use client" 
import { ServiceHeroSection, ServiceHowItWorks, ServicePlansSection } from '@/components/service'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Service() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <ServiceHeroSection />
            <ServiceHowItWorks />
            <ServicePlansSection />
        </Flex>
    )
}
