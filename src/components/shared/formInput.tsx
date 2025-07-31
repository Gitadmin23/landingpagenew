"use client"
import { Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";

interface IProps {
    name: string;
    height?: string;
    placeholder?: string;
    value?: any;
    label?: string;
    type?: React.HTMLInputTypeAttribute,
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean,
    icon?: React.ReactNode,
    iconback?: React.ReactNode
    setValue: (name: string, value: string) => void,
    errors?: any,
    touched?: any,
    phone?: boolean,
    isPassword?: boolean
}

export default function FormInput(
    {
        name,
        height,
        placeholder,
        value,
        label,
        type,
        hasFrontIcon,
        hasBackIcon,
        icon,
        iconback,
        setValue,
        errors,
        touched,
        phone,
        isPassword
    }: IProps) {

    const changeHandler = (item: string) => {
        setValue(name, item)
    }

    const [newValue, setNewValue] = useState("")

    const [showPassWord, setShowPassword] = useState("password")

    useEffect(() => {
        setNewValue(value[name] ?? "")
    }, [value[name]])


    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} ml={"2"} >{label}</Text>
            <Flex flexDir={"column"} gap={"1"} >
                <Flex pos={"relative"} h={height ?? "45px"} >
                    {hasFrontIcon && (
                        <Flex w={"48px"} h={height ?? "45px"} justifyContent={"center"} alignItems={"center"} px={"2"} >
                            {icon}
                        </Flex>
                    )}
                    {(hasBackIcon || isPassword) && (
                        <Flex w={"48px"} h={height ?? "45px"} position={"absolute"} right={"0px"} zIndex={"20"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} px={"2"} >
                            {isPassword ? (
                                <Flex onClick={() => setShowPassword((prev) => prev === "text" ? "password" : "text")} >
                                    {showPassWord !== "text" ?
                                        <IoEye size={"20px"} /> :
                                        <IoEyeOff size={"20px"} />
                                    }
                                </Flex>
                            ) : (
                                <>
                                    {iconback}
                                </>
                            )}
                        </Flex>
                    )}
                    {!phone && (
                        <Input
                            type={isPassword ? showPassWord : type ?? "text"}
                            value={newValue}
                            onChange={(e) => changeHandler(e.target.value)}
                            w={"full"}
                            h={height ?? "45px"}
                            px={"4"}
                            outline={"none"}
                            bgColor={"white"}
                            color={"black"}
                            borderRadius={"9999px"}
                            border={"1px solid #EAEBED"}
                            _placeholder={{ color: "gray.500" }}
                            placeholder={placeholder}
                        />
                    )}
                    {phone && (
                        <PhoneInput
                            country={"ng"}
                            enableSearch
                            // style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}

                            containerStyle={{
                                borderRadius: '32px',
                                overflow: 'hidden',
                                height: '45px',
                                width: "100%",
                            }}
                            inputStyle={{
                                borderRadius: '32px',
                                height: '45px',
                                width: "100%",
                                paddingLeft: '48px', // space for flag
                            }}
                            buttonStyle={{
                                borderRadius: '32px 0 0 32px',
                                height: '45px',
                            }}
                            dropdownStyle={{
                                position: 'fixed', // 👈 This makes the popup fixed
                                zIndex: 2000,
                                // ensure it's above modals/overlays
                            }}
                            value={newValue}
                            onChange={(phone: any) => changeHandler(phone)}
                        />
                    )}
                </Flex>
                {touched && (
                    <>
                        {(touched[name] && errors[name]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name]}</Text>
                            </Flex>
                        }
                    </>
                )}
                {/* {errors[name] && <p className=' text-sm text-error600 font-OpenRunde-Medium ' >{errors[name]?.message as string}</p>} */}
            </Flex>
        </Flex>
    )
}
