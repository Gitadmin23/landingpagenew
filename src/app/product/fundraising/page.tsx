"use client"
import { EVENT_PAGE_URL } from "@/helpers/services/urls";
import { Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; 


export default function Page() {
 
    return (
        <Flex w={"full"} h={"100vh"} pos={"relative"} > 
            <iframe src={EVENT_PAGE_URL + "/product/fundraising?frame=true&theme=light"} width="100%" height="100%" ></iframe> 
        </Flex>
    )
}