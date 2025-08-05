"use client"
import { EVENT_PAGE_URL } from "@/helpers/services/urls";
import { Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; 


export default function Page() {

    const router = useRouter() 
    return (
        <Flex w={"full"} h={"100vh"} pos={"relative"} >
        <Flex pos={"absolute"} onClick={() => router.push("/")} top={"8"} bgColor={"transparent"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} zIndex={"20"} left={"8"} w={"9"} h={"9"} rounded={"full"} borderWidth={"0px"} >
            <Image src={"/images/logo.png"} alt="logo" w={"60px"} h={"fit-content"} />
        </Flex> 
            <iframe src={EVENT_PAGE_URL + "/product/fundraising?frame=true&theme=light"} width="100%" height="100%" ></iframe> 
        </Flex>
    )
}