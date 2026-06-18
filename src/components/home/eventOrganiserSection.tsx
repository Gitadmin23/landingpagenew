import useCustomTheme from '@/hooks/useTheme'
import { GreenTickTwo } from '@/svg';
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion';
import React, { useRef } from 'react'
import { CustomVideo } from '../shared';

export default function EventOrganiser() {

    const { primaryColor } = useCustomTheme()

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column-reverse", "column-reverse", "row"]} bg={"white"} alignItems={"center"} >
            <Flex
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateX(-150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={"full"} flexDir={"column"} gap={"4"} >
                <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} >Why event organizers turn to <span style={{ color: primaryColor }} >Chasescroll...</span></Text>
                <Flex flexDir={"column"} gap={"5"} mt={"2"} > 
                    <Flex gap={"3"}>
                        <Flex mt={"1"} w={"fit-content"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Proof of quality</Text>
                            <Text fontSize={"14px"} >{`Chasescroll has achieved an ALL TIME 98% success rate across over 3,000+ transactions on Paystack—with zero site crashes or reported bugs. Consistently delivers with 100% transaction success rate every month.`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex mt={"1"} w={"fit-content"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >No cost</Text>
                            <Text fontSize={"14px"} >{`Check any pro's work samples, client reviews, and account profile.`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex mt={"1"} w={"fit-content"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Safe and secure</Text>
                            <Text fontSize={"14px"} >{`Focus on your guests knowing we help protect your logistics and payments are secured with Paystack payment processing system. We're here with 24/7 support if you need it.`}</Text>
                        </Flex>
                    </Flex>

                    <Flex gap={"3"}>
                        <Flex mt={"1"} w={"fit-content"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Price</Text>
                            <Text fontSize={"14px"} >{`No hidden fees, only pay 3% service fee when withdrawing funds from your Chasescroll wallet.`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex mt={"1"} w={"fit-content"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Innovative</Text>
                            <Text fontSize={"14px"} >{`We're not your average event platform. Chasescroll is uniquely positioned to handle the tricky stuff others won't touch—so your event goes off without a hitch.`}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex> 
            <Flex 
                ref={reftwo}
                style={{
                    transform: isInView ? "none" : "translateX(+150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                w={["full", "full", "fit-content"]} >
                <Flex w={"full"} h={["300px", "440px", "440px"]} rounded={"2xl"} >
                    <Flex w={"full"} h={"full"} rounded={"2xl"} px={"2"} bgColor={"#F2F7F1"} justifyContent={"center"} alignItems={"center"} >
                        {/* <Image src="/images/aboutplatform.png" alt='hometo' objectFit={"cover"} h={["full", "full"]} /> */}
                        <CustomVideo url='nPtY0-WgUgo' />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
