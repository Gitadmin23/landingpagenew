"use client" 
import { FundHeroSection, FundHowItWorks, FundPlansSection } from '@/components/fundraising'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Fundraising() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <FundHeroSection />
            <FundHowItWorks />
            <FundPlansSection />
        </Flex>
    )
}
