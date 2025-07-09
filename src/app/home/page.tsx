"use client"    
import Faq from "@/components/home/FAQ"
import { GetThingDone, HeroSection, AboutEventSection, EventOrganiserSection, ProfessionService, UserComment, ServiceProvider } from "@/components/home"  
import { Flex } from "@chakra-ui/react"
import React from "react"  

export default function Home() {
    return ( 
      <Flex flexDir={"column"} color={"black"} w={"full"} >
      <HeroSection />
      <AboutEventSection />
      <GetThingDone />
      <EventOrganiserSection />
      <ProfessionService />
      <ServiceProvider/> 
      <UserComment />
      <Faq />
    </Flex>
    )
}