"use client"
import { AboutEventSection, EventOrganiserSection, GetThingDone, HeroSection } from "@/components/home";
import Faq from "@/components/home/FAQ";
import ProfessionService from "@/components/home/professionService";
import ServiceProvider from "@/components/home/serviceProvider";
import UserComment from "@/components/home/userComment";
import { LandingPageLayout } from "@/components/shared";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <LandingPageLayout>
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
    </LandingPageLayout>
  );
}
