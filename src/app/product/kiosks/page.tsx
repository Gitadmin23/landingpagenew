"use client"
import { DASHBOARDPAGE_URL } from "@/helpers/services/urls";
import { Flex } from "@chakra-ui/react"; 


export default function Page() { 
    return (
        <Flex w={"full"} h={"100vh"} pos={"relative"} > 
            <iframe src={DASHBOARDPAGE_URL + "/dashboard/product/kiosk?type=rental&frame=true&theme=light"} width="100%" height="100%" ></iframe>
        </Flex>
    )
}