"use client"
import useCustomTheme from '@/hooks/useTheme';
import { NewDonationIcon, NewEventIcon, RentalIcon, ServiceIcon, StoreIcon } from '@/svg';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react' 
import { CustomButton } from '../shared';

export default function HeroSection() {


    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    const [active, setActive] = useState("") 

    const { primaryColor, borderColor } = useCustomTheme()
    const { push } = useRouter()

    const clickHandler = (item: "kiosks" | "services" | "rentals" | "event" | "donation") => {
        if (item === "event") {
            push(`/product`)
        } else if (item === "donation") {
            push(`/product/fundraising`)
        } else {
            push(`/product/${item}`)
        }
    }

    return (
        <Flex w={"full"} h={[ "100vh"]} color={"white"} pos={"relative"} >
            <Flex pos={"absolute"} inset={"0px"} zIndex={"10"} style={{ background: "linear-gradient(116.54deg, rgba(84, 101, 224, 0) -7.35%, rgba(35, 61, 243, 0.2) 41.22%), linear-gradient(228.39deg, rgba(0, 0, 0, 0) -57.53%, rgba(0, 0, 0, 0.4) 90.44%), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))" }} />
            <Image src='/images/hero/hero.png' alt='hero' w={"full"} objectFit={"cover"} />
            <Flex pos={"absolute"} insetX={"0px"} bottom={"0px"} top={["64px", "64px", "101.03px"]} gap={"8"} px={["6", "6", "16"]} flexDirection={"column"} justifyContent={"center"} zIndex={"20"} >
                <Text
                    ref={ref}
                    style={{
                        transform: isInView ? "none" : "translateY(-50px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} maxW={"1100px"} fontSize={["42px", "42px", "60px"]} lineHeight={["120%", "120%", "75px"]} fontWeight={"700"} >Connecting event hosts in need to professionals who deliver.</Text>
                <Flex
                    ref={reftwo}
                    style={{
                        transform: isInViewtwo ? "none" : "translateY(+50px)",
                        opacity: isInViewtwo ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        background: "linear-gradient(115.13deg, rgba(35, 61, 243, 0.2) 20.26%, rgba(21, 35, 141, 0.2) 65.99%), linear-gradient(265.89deg, rgba(0, 0, 0, 0) 18.07%, rgba(0, 0, 0, 0.6) 86.4%)"
                    }} maxW={"833px"} px={["3", "3", "10"]} py={["6", "6", "10"]} rounded={"32px"} flexDir={"column"} alignItems={"center"} gap={"8"} zIndex={"15"} >
                    <Flex w={["full", "fit-content", "fit-content"]} gap={["3", "3", "0px"]} justifyContent={"space-around"} alignItems={"center"} bgColor={"white"} p={"6px"} rounded={"full"} >
                        <CustomButton onMouseOver={() => setActive("event")} onMouseOut={() => setActive("")} onClick={() => clickHandler("event")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewEventIcon color={active === "event" ? "white" : "black"} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Event</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "event" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "event" ? "white" : "black"} width={["fit-content", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("service")} onMouseOut={() => setActive("")} onClick={() => clickHandler("services")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <ServiceIcon color={active === "service" ? "white" : "black"} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Service</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "service" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "service" ? "white" : "black"} width={["fit-content", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("rental")} onMouseOut={() => setActive("")} onClick={() => clickHandler("rentals")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <RentalIcon color={active === "rental" ? "white" : "black"} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Rental</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "rental" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "rental" ? "white" : "black"} width={["fit-content", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("kiosk")} onMouseOut={() => setActive("")} onClick={() => clickHandler("kiosks")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <StoreIcon color={active === "kiosk" ? "white" : "black"} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Kiosk</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "kiosk" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "kiosk" ? "white" : "black"} width={["fit-content", "107px", "140px"]} />
                        {/* <Flex w="fit-content" display={["none", "none", "flex"]} > */}
                        <CustomButton onMouseOver={() => setActive("fundraising")} onMouseOut={() => setActive("")} onClick={() => clickHandler("donation")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewDonationIcon color={active === "fundraising" ? "white" : "black"} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "fundraising" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "fundraising" ? "white" : "black"} width={["fit-content", "107px", "140px"]} />
                        {/* </Flex> */}
                        {/* <Flex w={"fit-content"} position={"relative"} >

                            <Flex w={"30px"} onClick={() => setOpen((prev) => !prev)} rounded={"16px"} borderWidth={"1px"} borderColor={"black"} h={"30px"} pt={!open ? "2px" : "0px"} justifyContent={"center"} alignItems={"center"} ml={"auto"} display={["flex", "flex", "none"]}  >
                                {open && (
                                    <IoChevronUp size={"15px"} color='black' />
                                )}
                                {!open && (
                                    <IoChevronDown size={"15px"} color='black' />
                                )}
                            </Flex>
                            {open && (
                                <Flex position={"absolute"} top={"50px"} zIndex={"40"} right={"0px"} >
                                    <CustomButton onMouseOver={() => setActive("fundraising")} onMouseOut={() => setActive("")} onClick={() => clickHandler("donation")} text={
                                        <Flex alignItems={"center"} gap={"2"} >
                                            <Flex display={["none", "none", "flex"]} >
                                                <NewDonationIcon color={active === "fundraising" ? "white" : "black"} />
                                            </Flex>
                                            <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                                        </Flex>
                                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "fundraising" ? primaryColor : "white"} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "fundraising" ? "white" : "black"} width={["107px", "107px", "140px"]} />
                                </Flex>
                            )}
                        </Flex> */}
                    </Flex>
                    {/* <Image src='/images/hero/filter.png' alt='filter' /> */}

                    <Flex display={["none", "none", "flex"]} color={"black"} w={"fit-content"} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} h={"fit-content"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                        <Flex _disabled={{ backgroundColor: "white", opacity: "100%" }} h={"70px"} bgColor={"white"} w={"200px"} opacity={"70%"} outlineColor={"transparent"} outline={"none"} textAlign={"center"} justifyContent={"center"} alignItems={"center"} roundedLeft={"full"} borderWidth={"0px"} borderRightWidth={"1px"} borderRightColor={borderColor} >
                            Select Category
                        </Flex>
                        <Flex _disabled={{ backgroundColor: "white", opacity: "100%" }} h={"70px"} bgColor={"white"} w={"200px"} opacity={"70%"} rounded={"0px"} textAlign={"center"} justifyContent={"center"} alignItems={"center"} borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            Select State
                        </Flex>
                        {/* <CustomSelect placeholder='Select Category' /> */}
                        <Flex _disabled={{ backgroundColor: "white" }} bgColor={"white"} justifyContent={"center"} alignItems={"center"} opacity={"70%"} px={"2"} h={"70px"} w={"200px"} outline={"none"} rounded={"0px"} borderWidth={"0px"} borderLeftWidth={"1px"} borderRightColor={borderColor} >
                            Search business name
                        </Flex>
                        <Button disabled={true} h={"70px"} w={"140px"} color={"white"} outline={"none"} _hover={{ backgroundColor: primaryColor }} bgColor={primaryColor} roundedRight={"full"} borderRightWidth={"0px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            Search
                        </Button>
                    </Flex>
                    <Image src='/images/hero/brandlogo.png' alt='brand' ml={"4"} />
                </Flex>
                <Flex pos={["relative", "absolute"]} ml={"auto"} mt={"150px"} display={["none", "none","flex"]} zIndex={"10"} bottom={"10%"} right={"0px"} >
                    <Flex flexDir={"column"} gap={"3"} zIndex={"10"} alignItems={"center"} >
                        <Image w={"250px"} src='/images/newlink.png' alt='newlink' />
                        <Text maxW={"379px"} textAlign={"center"} >Chasescroll is the official ticketing partner for LinkedIn  local Nigeria events</Text>
                    </Flex>
                    <Flex h={"59px"} ml={"-120px"} mr={"-50px"} mt={"12"} transform="rotate(-10deg)" w={"200px"} bgColor={"#5465E0"} >

                    </Flex>
                </Flex>

                <Flex pos={["relative"]} ml={"auto"} display={["flex", "none", "none"]} zIndex={"10"} right={"0px"} >
                    <Flex flexDir={"column"} gap={"3"} zIndex={"10"} alignItems={"center"} >
                        <Image w={"150px"} src='/images/newlink.png' alt='newlink' />
                        <Text maxW={"223px"} fontSize={"10px"} p={"3"} style={{background: "linear-gradient(268.4deg, rgba(35, 61, 243, 0.05) -140.32%, rgba(21, 35, 141, 0.05) -40.12%), linear-gradient(240.97deg, rgba(0, 0, 0, 0) 18.59%, rgba(0, 0, 0, 0.2) 261.49%)"}} textAlign={"center"} >Chasescroll is the official ticketing partner for LinkedIn  local Nigeria events</Text>
                    </Flex>
                    <Flex h={"35px"} ml={"-120px"} mr={"-50px"} mt={"9"} transform="rotate(-10deg)" w={"200px"} bgColor={"#5465E0"} >

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
