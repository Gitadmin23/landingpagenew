"use client"
import { EVENT_PAGE_URL } from "@/helpers/services/urls";
import { Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";


export default function Page() {

    const router = useRouter() 
    return (
        <Flex w={"full"} h={"100vh"} pos={"relative"} > 
            <iframe src={EVENT_PAGE_URL + "/product/events?frame=true&theme=light"} width="100%" height="100%" ></iframe> 
        </Flex>
    )
}