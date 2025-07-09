"use client" 
import { RentalHeroSection, RentalPlansSection, RentalHowItWorks } from '@/components/rental'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Rental() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <RentalHeroSection />
            <RentalHowItWorks />
            <RentalPlansSection />
        </Flex>
    )
}
