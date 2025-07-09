"use client"
import { AboutFirstSection, AboutMissionAndGoal, AboutMissionAndVision, AboutTeamSection } from "@/components/aboutus";
import { DiscoverApp, VersionInfo } from "@/components/home"; 
import { Flex } from "@chakra-ui/react";



function AboutUs() {
    return (
        <Flex flexDir={"column"} w={"full"} >
            <AboutFirstSection />
            <AboutMissionAndGoal />
            <AboutMissionAndVision />
            <AboutTeamSection />
            <VersionInfo />
            <DiscoverApp hide={true} />
        </Flex>
    )
}

export default AboutUs