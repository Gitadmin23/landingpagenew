"use client"
import { ContactAddressSection, ContactFirstSection } from "@/components/contactus"; 
import { Flex } from "@chakra-ui/react";



function ContactPage(){
    return(
        
        <Flex flexDir={"column"} w={"full"} >
            <ContactFirstSection />
            <ContactAddressSection />
            {/* <VersionInfo />
            <DiscoverApp hide={true} /> */}
        </Flex>
    )
}

export default ContactPage