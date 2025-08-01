"use client"
import { DASHBOARDPAGE_URL, EVENT_PAGE_URL } from "@/helpers/services/urls";
import { Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";


export default function Page() {

    const router = useRouter() 
    return (
        <Flex w={"full"} h={"100vh"} pos={"relative"} >
            <Flex pos={"absolute"} onClick={() => router.push("/")} top={"8"} bgColor={"white"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} zIndex={"20"} left={"8"} w={"9"} h={"9"} rounded={"full"} borderWidth={"1px"} >
                <IoChevronBack size={"25px"} color="black" />
            </Flex> 
            <iframe src={DASHBOARDPAGE_URL + "/dashboard/product/kiosk?type=service&frame=true"} width="100%" height="100%" ></iframe> 
        </Flex>
    )
}