
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { title } from "process";
import { useRouter } from "next/navigation";
import { CustomButton } from "../shared";
import { DownArrowIcon } from "@/svg";
import useCustomTheme from "@/hooks/useTheme";
import { FAQDATA } from "@/helpers/dataBank";


export default function Faq() {

    const [selectedData, setSelectedData] = useState(Array<string>)

    const clickHander = (item: string) => {
        if (selectedData?.includes(item)) {
            setSelectedData(prevItems => prevItems.filter(data => data !== item));
        } else {
            setSelectedData([...selectedData, item])
        }
    }

    const router = useRouter()

    const { primaryColor, mainBackgroundColor } = useCustomTheme()

    return (
        <Flex bgColor={"white"} id="faq" px={["6", "6", "12"]} gap={["4", "4", "4", "0px"]} flexDir={["column", "column", "column", "row"]} py={["10", "10", "20"]} w={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} pr={["0px", "0px", "4"]} justifyContent={"center"} gap={["4", "4", "7"]} alignItems={"start"} >
                <Text maxW={["190px", "190px", "347.48px"]} fontWeight={"semibold"} fontSize={["20px", "20px", "45px"]}  >Have questions? We have <span style={{ color: primaryColor }} >answers</span></Text>
                <Text fontSize={["12px", "12px", "15.38px"]} lineHeight={["17px", "17px", "26px"]} fontWeight={"medium"} >Want to know more? You can email us anytime at <span style={{ color: primaryColor, fontWeight: "400" }} >support@chasescroll.com</span></Text>
                <CustomButton onClick={() => router.push("/auth/signup")} text={"Get Started"} width={"152px"} backgroundColor={primaryColor} height={"52px"} borderWidth={"1px"} borderColor={primaryColor} color={"white"} borderRadius={"999px"} />
            </Flex>
            <Flex pl={["0px", "0px", "4"]} w={"full"} flexDir={"column"} alignItems={"center"} borderLeftWidth={["0px", "0px", "0px", "1px"]} borderLeftColor={"#E2E8F0"} >
                {FAQDATA?.map((item: {
                    title: string,
                    desc: string
                }, index: number) => {
                    return (
                        //  white-space: pre-wrap;
                        (<Flex key={index} flexDir={"column"} maxW={"575px"} w={"full"} >
                            <Flex borderBottomWidth={selectedData?.includes(item?.title) ? "0px" : "1px"} borderBottomColor={"#E2E8F0"} py={"8"} maxW={"575px"} w={"full"} >
                                <Flex justifyContent={"space-between"} gap={"4"} w={"full"} >
                                    <Text fontSize={"19px"} lineHeight={"32px"} color={"#222222"} >{item?.title}</Text>
                                    <Box
                                        transform={`rotate(${selectedData?.includes(item?.title) ? "180" : "0"}deg)`}
                                        transition="transform 0.3s" outline={"none"} onClick={() => clickHander(item?.title)} as="button" >
                                        <DownArrowIcon />
                                    </Box>
                                </Flex>
                            </Flex>
                            {selectedData?.includes(item?.title) && (
                                <Flex borderBottomWidth={"1px"} borderBottomColor={"#E2E8F0"} py={"4"} maxW={"575px"} w={"full"} >
                                    <Text whiteSpace={"pre-wrap"} fontSize={"16px"} lineHeight={"32px"} color={"#222222"} >{item?.desc}</Text>
                                </Flex>
                            )}
                        </Flex>)
                    );
                })}
            </Flex>
        </Flex>
    );
}