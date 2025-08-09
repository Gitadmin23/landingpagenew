"use client"
import { Box, Checkbox, Flex, Link, Text } from "@chakra-ui/react";
import { CustomButton, CustomInput, ModalLayout } from "../shared";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/svg";
import { IoArrowBack } from "react-icons/io5";
import useAuth from "@/hooks/useAuth";
import CustomDatePicker from "../shared/customDatePicker";
import useCustomTheme from "@/hooks/useTheme";


export default function SignUpForm(
    {
        open,
        setOpen,
    }: {
        open: boolean;
        setOpen: (item: boolean) => void
    }
) {

    const [tab, setTab] = useState(false)
    const {
        primaryColor
    } = useCustomTheme()

    const { formikSignUp: formik, signupPending } = useAuth()

    const clickHandler = () => {

        if (formik.values.dob && formik.values.firstName && formik.values.lastName && formik.values.email) {
            setTab(true)
        } else {
            formik.handleSubmit()
        }
    }

    return (
        <ModalLayout open={open} size={"md"} trigger={true} close={() => setOpen(false)} >
            <Flex w={"full"} h={["full", "full", "auto"]} justifyContent={"center"} alignItems={"center"} >
                <Flex w={"full"} py={"4"} flexDir={"column"} alignItems={"center"} >
                    <Flex px={"4"} justifyContent={"space-between"} w={"full"} alignItems={"center"} >
                        {!tab && (
                            <Box cursor={"pointer"} mr={"auto"} onClick={() => setOpen(false)} >
                                <CloseIcon color='black' size='12' />
                            </Box>
                        )}
                        {(tab) && (
                            <Box cursor={"pointer"} mr={"auto"} onClick={() => setTab(false)} >
                                <IoArrowBack color='black' size='20px' />
                            </Box>
                        )}
                        <Text fontSize={"14px"} ml={"auto"} color={"#C0C0C0"} fontWeight={"600"} >
                            Step {!tab ? 1 : 2}/2
                        </Text>
                    </Flex>
                    {!tab && (
                        <Flex overflowY={"auto"} overflowX={"hidden"} gap={"3"} h={["full", "full", "60vh"]} pb={"5"} pt={"1"} px={"4"} fontSize={"14px"} alignItems={"center"} maxW={"375px"} w={"full"} flexDir={"column"}  >
                            <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"700"} mb={"4"} >Create your account</Text>
                            <CustomInput label="First Name" name='firstName' type='text' placeholder='Enter your First Name' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomInput label="Last Name" name='lastName' type='text' placeholder='Enter your Last Name' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomInput label="Email" name='email' type='text' placeholder='Enter your Email' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomDatePicker label="Date of birth" name={['dob']} value={formik?.values.dob} errors={formik.errors} touched={formik.touched} setValue={formik?.setFieldValue} />
                            <CustomButton text={"Next"} mt={"4"} onClick={() => clickHandler()} borderRadius={"999px"} />
                        </Flex>
                    )}
                    {tab && (
                        <Flex overflowY={"auto"} overflowX={"hidden"} gap={"3"} h={["full", "full", "60vh"]} pb={"5"} pt={"1"} px={"4"} fontSize={"14px"} alignItems={"center"} maxW={"375px"} w={"full"} flexDir={"column"}  >
                            <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"700"} mb={"4"} >Create your account</Text>
                            <CustomInput label="Username" name='username' type='text' placeholder='Enter your Username' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomInput label="phone" name='phone' phone={true} type="tel" placeholder='' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomInput isPassword={true} label="Password" name='password' type='text' placeholder='Enter your Password' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                            <CustomInput isPassword={true} label="Confirm Password" name='confirmPassword' type='text' placeholder='Enter your Confirm Password' errors={formik.errors} touched={formik.touched} value={formik?.values} setValue={formik?.setFieldValue} />
                        <Text
                            fontSize={"xs"} 
                            marginLeft="0px"
                            color='black'
                        >
                            I accept the{" "}
                            <Link target="_blank" href={"/home/terms"}>
                                <span style={{ color:primaryColor }}>
                                    {" "}
                                    terms of service{" "}
                                </span>
                            </Link>{" "}
                            as well as the{" "}
                            <Link target="_blank" href={"/home/privacy"}>
                                <span style={{ color:primaryColor }}>
                                    {" "}
                                    privacy policy{" "}
                                </span>
                            </Link>
                            </Text>
                            <CustomButton text={"Submit"} mt={"4"} loading={signupPending} onClick={() => formik.handleSubmit()} borderRadius={"999px"} />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </ModalLayout>
    )
}