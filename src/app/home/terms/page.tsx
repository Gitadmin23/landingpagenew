"use client" 
import { CustomButton } from '@/components/shared' 
import { termsandCondition } from '@/helpers/terms'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() { 

    const router = useRouter()

    const { primaryColor } = useCustomTheme()

    return (
        <Flex flexDir={"column"} color={"#1E1E1E"} lineHeight={"211.7% "} py={["8", "8", "8", "40"]} px={["6", "6", "6", "20"]} >
            <Flex justifyContent={"center"} mb={"4"} pos={"relative"} >
                <Text fontSize={"24px"} fontWeight={"bold"} >Terms and Conditions for Customers/Users on Chasescroll</Text>
                <Box pos={"absolute"} zIndex={"20"} right={"0px"} onClick={() => router.back()} >
                    <svg role="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="close">
                            <path id="Vector" d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black" />
                        </g>
                    </svg>
                </Box>
            </Flex>

            <Box
                my={"3"} lineHeight={"22px"}
                whiteSpace="pre-wrap"
                p={[2, 4, 4]} 
                fontSize="base"
                 fontWeight={"500"}
            >
                {termsandCondition}
            </Box>
            <CustomButton onClick={() => router.push("/home")} text={"Back"} mt={"8"} width={["full", "full", "152px"]} backgroundColor={["white", "white", primaryColor + ""]} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={[primaryColor, primaryColor, "white"]} borderRadius={"8px"} />
        </Flex>
    )
}
