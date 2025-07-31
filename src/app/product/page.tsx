"use client"
import { EVENT_PAGE_URL } from "@/helpers/services/urls";
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
            {/* {pathname?.includes("event") && ( */}
                <iframe src={EVENT_PAGE_URL + "/product/events?frame=true"} width="100%" height="100%" ></iframe>
            {/* // )}
            // {pathname?.includes("fundraising") && (
            //     <iframe src={EVENT_PAGE_URL + "/product/fundraising?frame=true"} width="100%" height="100%" ></iframe>
            // )} */}
        </Flex>
    )
}