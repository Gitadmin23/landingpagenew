
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Box, Flex, Text } from "@chakra-ui/react";
import { toaster } from '../ui/toaster';
import useCustomTheme from '@/hooks/useTheme';
import { useRef, useState } from 'react';

interface IProps {
    name: Array<string>;
    value: string;
    start?: string
    end?: string;
    setValue: (name: string, value: any) => void,
    errors?: any,
    touched?: any,
    label?: string,
    index?: number
}

export default function CustomDatePicker(
    {
        value,
        name,
        label, 
        touched,
        errors, 
        setValue,
        index = 0
    }: IProps) {

    const {
        headerTextColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const modalContentRef = useRef(null);
    const triggerRef = useRef(null);

    const changeHandler = (item: any) => { 
        setValue(name[0], Date.parse(new Date(item).toJSON()))
    }

    return (
        <Flex pos={"relative"} zIndex={"50"} position={"relative"} w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label?.replace("*", "")}<span style={{ color: "red", fontSize: "16px" }} >{label?.includes("*") ? "*" : ""}</span></Text>
            <Text fontSize={"12px"} lineHeight={"19px"} color={"#626262"} >This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Text>
            <Flex ref={modalContentRef} flexDir={"column"} color={headerTextColor} gap={"1"} rounded={"full"} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    disableFuture
                        defaultValue={dayjs(value)}
                        format="MM/DD/YYYY"
                        onChange={(item, context) => {
                            if (context.validationError == null) {
                                changeHandler(item);
                            }
                        }}
                        // open={open}
                        // onOpen={() => setOpen(true)}
                        // onClose={() => {
                        //     setOpen(false);
                        // }} 
                        slotProps={{
                            // textField: {
                            //     onClick: () => setOpen(true), // open on text field click
                            // },
                            popper: {
                                container: modalContentRef.current || undefined,
                                // anchorEl: triggerRef.current || undefined,
                                sx: {
                                    zIndex: 1700,
                                    // '& .MuiPaper-root': {
                                    //     position: 'fixed'
                                    // },
                                },
                            }
                        }}
                    />

                </LocalizationProvider>
                {touched && (
                    <>
                        {(touched[name[0]] && errors[name[0]]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name[0]]}</Text>
                            </Flex>
                        }
                    </>
                )}
                {errors && (
                    <>
                        {errors[index]?.endDate && (
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[index]?.endDate}</Text>
                            </Flex>
                        )}
                    </>
                )}
            </Flex>
        </Flex>
    )
}

