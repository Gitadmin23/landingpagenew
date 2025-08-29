"use client"
import { Box, Button, Drawer, Menu, Flex, Image, Portal, Text, CloseButton } from "@chakra-ui/react";
import React from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { HambergerMenu } from "iconsax-react";
import { NewDonationIcon, NewEventIcon, RentalIcon, ServiceIcon, StoreIcon } from "../../svg";
import { SidebarHomeIcon } from "../../svg/sidebarIcons";
import CustomButton from "./customButton";
import useCustomTheme from "@/hooks/useTheme";
import { IoChevronDown } from "react-icons/io5";


function HomeNavbar(
    { yaxis }: {
        yaxis: any
    }
) {

    const homelink = [
        {
            label: "Home",
            link: "/"
        },
        {
            label: "Versax",
            link: "/",
            sublink: [
                {
                    label: "Find Event",
                    link: "/home/event"
                },
                {
                    label: "Find Service",
                    link: "/home/service"
                },
                {
                    label: "Find Kiosk",
                    link: "/home/kiosk"
                },
                {
                    label: "Find Rental",
                    link: "/home/rental"
                },
                {
                    label: "Find Fundraising",
                    link: "/home/fundraising"
                },
            ]
        },
        {
            label: "About us",
            link: "/home/about-us"
        },
        {
            label: "FAQ",
            link: "/home#faq"
        },
        // {
        //     label: "Policy",
        //     link: "/home/privacy"
        // },
        {
            label: "Terms & Condition",
            link: "/home/terms"
        },
        {
            label: "Contact us",
            link: "/home/contact-us"
        }
    ]
 
    const token = ""

    const pathname = usePathname();
    const router = useRouter();

    const { primaryColor } = useCustomTheme()

    const clickHandler = (item: string) => {
        router?.push(item)
        // onClose()
    } 

    return (
        <>
            <Flex position={"absolute"} top={"0px"} />
            <Flex
                style={{
                    backgroundColor: (yaxis === 0) ? "transparent" : "white",
                }} w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} color={pathname?.includes("term") ? "black" : (yaxis === 0) ? "white" : "black"} height={["64px", "64px", "101.03px"]} px={["6", "6", "12"]} justifyContent={"space-between"} alignItems={"center"}  >
                <Flex onClick={() => router.push("/")} as={"button"} alignItems={"center"} gap={"2"} >
                    <Image width={["32px", "32px", "60px"]} src={"/assets/logo.png"} alt="logo" />
                    <Flex flexDir={"column"} alignItems={"start"} >
                        <Text fontWeight={"bold"} fontSize={["14px", "14px", "16px"]} color={pathname?.includes("term") ? primaryColor : (yaxis === 0) ? "white" : primaryColor} >Chasescroll</Text>
                        <Text fontWeight={"medium"} fontStyle={"italic"} fontSize={["9px", "9px", "10px"]}>Discover. Connect. Elevate Your Events</Text>
                    </Flex>
                </Flex>
                <Flex h={"56px"} display={["none", "none", "none", "none", "flex"]} alignItems={"center"} px={"6"} rounded={"full"} style={{ background: yaxis === 0 ? "linear-gradient(265.89deg, rgba(0, 0, 0, 0) 18.07%, rgba(0, 0, 0, 0.1) 86.4%)" : "white" }} gap={"8"} >
                    {homelink?.map((item: {
                        label: string,
                        link: string,
                        sublink?: Array<{
                            label: string,
                            link: string
                        }>
                    }) => {
                        if (item?.label === "Versax") {
                            return (
                                <Menu.Root key={item?.label + item?.link} >
                                    <Menu.Trigger asChild>
                                        <Button px={4}
                                            py={2}
                                            outline={"none"}
                                            transition='all 0.2s'
                                            borderRadius='md'
                                            borderWidth='0px'
                                            _hover={{ bg: 'transparent' }}
                                            _expanded={{ bg: 'transparent' }}
                                            lineHeight={"22.5px"} fontWeight={"semibold"}
                                            cursor={"pointer"} variant="outline" size="sm">
                                            <Flex gap={"3"} lineHeight={"22.5px"} fontWeight={"semibold"} alignItems={"center"} _hover={{ color: primaryColor }} >
                                                <Text color={pathname?.includes("term") ? "black" : (yaxis === 0) ? "white" : "black"} lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text> <IoChevronDown color={pathname?.includes("term") ? "black" : (yaxis === 0) ? "white" : "black"} />
                                            </Flex>
                                        </Button>
                                    </Menu.Trigger>
                                    <Portal>
                                        <Menu.Positioner>
                                            <Menu.Content bgColor={"white"} px={"2"} py={"2"} >
                                                {item?.sublink?.map((subitem, subindex) => {
                                                    return (
                                                        <Flex w={"full"} cursor={"pointer"} as={"button"} key={subindex} onClick={() => router?.push(subitem?.link)} color={"black"} >
                                                            <Menu.Item value={subitem?.label} px={"2"} color={"black"} h={"30px"} fontWeight={"medium"} >{subitem?.label}</Menu.Item>
                                                        </Flex>
                                                    )
                                                })}
                                            </Menu.Content>
                                        </Menu.Positioner>
                                    </Portal>
                                </Menu.Root>
                            )
                        } else {
                            return (
                                <Box onClick={() => clickHandler(item?.link)} key={item?.label + item?.link} cursor={"pointer"} _hover={{ color: primaryColor }} >
                                    <Text lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                                </Box>
                            )
                        }
                    })}
                </Flex>
                {!token && (
                    <Flex display={["none", "none", "none", "none", "flex"]} gap={"4"} >
                        <CustomButton onClick={() => clickHandler("/auth")} text={"Login"} width={"152px"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} borderRadius={"999px"} />
                        <CustomButton onClick={() => clickHandler("/auth/signup")} text={"Get Started"} width={"152px"} backgroundColor={primaryColor} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={"white"} borderRadius={"999px"} />
                    </Flex>
                )}
                {token && (
                    <Flex display={["none", "none", "none", "none", "flex"]} gap={"4"} >
                        <CustomButton onClick={() => clickHandler("/dashboard/product")} text={"Dashboard"} width={"152px"} backgroundColor={primaryColor} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={"white"} borderRadius={"999px"} />
                    </Flex>
                )} 
                <Drawer.Root size={"xs"}>
                    <Drawer.Trigger asChild>
                        <Flex display={["flex", "flex", "flex", "flex", "none"]} cursor={"pointer"} >
                            <HambergerMenu
                                size="30"
                                color={pathname?.includes("term") ? primaryColor : (yaxis === 0) ? "white" : primaryColor}
                            />
                        </Flex>
                    </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content>
                                <Drawer.Header>
                                    {/* <Drawer.Title>Drawer Title</Drawer.Title> */}
                                </Drawer.Header>
                                <Drawer.Body bgColor={"white"} >

                                    <Flex width={"full"} h={"full"} pt={"20"} position={"relative"} flexDir={"column"} justifyContent={"start"} gap={"8"} px={"3"} fontSize={"lg"} >
                                        <Flex flexDir={"column"} gap={"5"} >
                                            {homelink?.map((item: {
                                                label: string,
                                                link: string,
                                                sublink?: Array<{
                                                    label: string,
                                                    link: string
                                                }>
                                            }) => {
                                                if (item?.label === "Versax") {
                                                    return (
                                                        <Flex key={item?.label} flexDirection={"column"} gap={"5"} >
                                                            <Box key={item?.label + item?.link} cursor={"pointer"} _hover={{ color: primaryColor }} >
                                                                <Text color={pathname === item?.link ? primaryColor : "black"} fontSize={"14px"} fontWeight={"bold"} >{item?.label}</Text>
                                                            </Box>
                                                            <Flex flexDir={"column"} gap={"5"} >
                                                                {item?.sublink?.map((subitem, subindex) => {
                                                                    return (
                                                                        <Flex key={subindex} gap={"2"} onClick={() => clickHandler(subitem?.link)} cursor={"pointer"} _hover={{ color: primaryColor }} alignItems={"center"} >
                                                                            {subitem?.label === "Find Event" &&
                                                                                <NewEventIcon color={pathname === subitem?.link ? primaryColor : "black"} />
                                                                            }
                                                                            {subitem?.label === "Find Service" &&
                                                                                <ServiceIcon color={pathname === subitem?.link ? primaryColor : "black"} />
                                                                            }
                                                                            {subitem?.label === "Find Kiosk" &&
                                                                                <StoreIcon color={pathname === subitem?.link ? primaryColor : "black"} />
                                                                            }
                                                                            {subitem?.label === "Find Rental" &&
                                                                                <RentalIcon color={pathname === subitem?.link ? primaryColor : "black"} />
                                                                            }
                                                                            {subitem?.label === "Find Fundraising" &&
                                                                                <NewDonationIcon color={pathname === subitem?.link ? primaryColor : "black"} />
                                                                            }
                                                                            <Text color={pathname === subitem?.link ? primaryColor : "black"} fontSize={"14px"} fontWeight={"medium"} >{subitem?.label}</Text>
                                                                        </Flex>
                                                                    )
                                                                })}
                                                            </Flex>
                                                        </Flex>
                                                        // <Menu.Root open={navBg} key={item?.label + item?.link} >
                                                        //     <Menu.Trigger asChild>
                                                        //         <Flex onClick={()=> setNavBg(true)} gap={"3"} w={"full"} cursor={"pointer"} alignItems={"center"} _hover={{ color: primaryColor }} >
                                                        //             <Text color={"black"} fontWeight={"bold"} fontSize={"14px"} >{item?.label}</Text> <IoChevronDown color={"black"} />
                                                        //         </Flex>
                                                        //     </Menu.Trigger>
                                                        //     <Portal >
                                                        //         <Menu.Positioner>
                                                        //             <Menu.Content bgColor={"white"} px={"2"} py={"2"} zIndex={"1000"} >
                                                        //                 {item?.sublink?.map((subitem, subindex) => {
                                                        //                     return (
                                                        //                         <Flex as={"button"} key={subindex} onClick={() => router?.push(subitem?.link)} color={"black"} >
                                                        //                             <Menu.Item value={subitem?.label} px={"2"} color={"black"} h={"30px"} fontWeight={"medium"} >{subitem?.label}</Menu.Item>
                                                        //                         </Flex>
                                                        //                     )
                                                        //                 })}
                                                        //             </Menu.Content>
                                                        //         </Menu.Positioner>
                                                        //     </Portal>
                                                        // </Menu.Root>
                                                    )
                                                } else {
                                                    return (
                                                        <Flex gap={"2"} onClick={() => clickHandler(item?.link)} key={item?.label + item?.link} cursor={"pointer"} _hover={{ color: primaryColor }} alignItems={"center"} >
                                                            {item?.label === "Home" && (
                                                                <SidebarHomeIcon size="19px" color={pathname === "/" ? true : false} />
                                                            )}
                                                            <Text color={pathname === item?.link ? primaryColor : "black"} fontSize={"14px"} fontWeight={"bold"} >{item?.label}</Text>
                                                        </Flex>
                                                    )
                                                }
                                            })}
                                        </Flex>
                                    </Flex>
                                </Drawer.Body>
                                <Drawer.Footer bgColor={"white"} p={"3"} >
                                    {!token && (
                                        <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                            <CustomButton onClick={() => clickHandler("/auth")} text={"Login"} width={"full"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} borderRadius={"999px"} />
                                            <CustomButton onClick={() => clickHandler("/auth")} text={"Get Started"} width={"full"} backgroundColor={primaryColor} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={"white"} borderRadius={"999px"} />
                                        </Flex>
                                    )}
                                    {token && (
                                        <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                            <CustomButton onClick={() => clickHandler("/dashboard/product")} text={"Dashboard"} width={"full"} backgroundColor={primaryColor} height={"48px"} borderWidth={"1px"} borderColor={primaryColor} color={"white"} borderRadius={"8px"} />
                                        </Flex>
                                    )}
                                </Drawer.Footer>
                                <Drawer.CloseTrigger _hover={{ backgroundColor: "black" }} asChild>
                                    <CloseButton color={"black"} _hover={{ color: "white" }} size="md" />
                                </Drawer.CloseTrigger>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Flex>
        </>
    )
}

export default HomeNavbar