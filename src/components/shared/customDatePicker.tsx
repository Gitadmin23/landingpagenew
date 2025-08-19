
import { CalendarIcon, DateCalendar, DatePicker, DateTimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Box, Flex, Text } from "@chakra-ui/react";
import { toaster } from '../ui/toaster';
import useCustomTheme from '@/hooks/useTheme';
import { useRef, useState } from 'react';
import ModalLayout from './modalLayout';
import { dateFormat } from '@/helpers/utils/dateFormat';
import CustomButton from './customButton';

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

    const modalContentRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [currentView, setCurrentView] = useState<"year" | "month" | "day">("year");

    const changeHandler = (item: any) => {

        const eighteenYearsAgo = dayjs().subtract(18, "year");
        if (item.isAfter(eighteenYearsAgo)) {
            toaster.create({
                type: "error",
                title: "You must be at least 18 years old",
                closable: true
            })
            setValue("", Date.parse(new Date(item).toJSON()))
            return
        } else {
            setValue(name[0], Date.parse(new Date(item).toJSON()))
        }
    }

    return (
        <Flex pos={"relative"} zIndex={"50"} position={"relative"} w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label?.replace("*", "")}<span style={{ color: "red", fontSize: "16px" }} >{label?.includes("*") ? "*" : ""}</span></Text>
            <Text fontSize={"12px"} lineHeight={"19px"} color={"#626262"} >This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Text>
            <Flex ref={modalContentRef} flexDir={"column"} color={"black"} gap={"1"} rounded={"full"} >
                <ModalLayout trigger={true} width='fit' open={open} close={() => setOpen(false)} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Flex flexDir={"column"} w={"full"} pb={"2"} >
                            <DateCalendar
                                disableFuture
                                value={dayjs(value)}
                                onChange={(d) => {
                                    changeHandler(d);
                                    // ✅ After selecting year → move to month, then day
                                    if (currentView === "year") {
                                        setCurrentView("month");
                                    } else if (currentView === "month") {
                                        setCurrentView("day");
                                    }
                                }}
                                maxDate={dayjs().subtract(18, "year")}
                                views={["year", "month", "day"]}
                                view={currentView}
                                onViewChange={(newView) => setCurrentView(newView)}
                                openTo="year" // ✅ optional: start with year view
                                reduceAnimations                   // ✅ smoother on mobile
                                slotProps={{
                                    switchViewButton: {
                                        // ✅ make sure header (year/month) is clickable
                                        sx: {
                                            "& .MuiPickersCalendarHeader-switchViewButton": {
                                                pointerEvents: "auto",
                                            },
                                        },
                                    },
                                }}

                            />
                            <Flex w={"full"} justifyContent={"end"} pr={"2"} >
                                <CustomButton onClick={() => setOpen(false)} fontSize={"xs"} px={"4"} height={"35px"} width={"fit-content"} borderRadius={"full"} text={"Done"} />
                            </Flex>
                        </Flex>
                    </LocalizationProvider>
                </ModalLayout>
                <Flex rounded={"full"} cursor={"pointer"} onClick={() => setOpen(true)} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} px={"3"} h={"45px"} display={["flex", "flex", "flex"]} >
                    {!value ? "Select Date" : dateFormat(value)}
                    <CalendarIcon />
                </Flex>
                {/* 
                <Flex display={["none", "none", "flex"]} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            value={dayjs(value)}
                            format="ddd, MMMM Do YYYY"
                            onChange={(item, context) => {
                                if (context.validationError == null) {
                                    changeHandler(item);
                                }
                            }}
                            maxDate={dayjs().subtract(18, "year")}
                            views={["year", "month", "day"]} // ✅ allow year/month/day switching
                            openTo="year" // ✅ optional: start with year view
                            slotProps={{
                                popper: {
                                    // ensures popper is rendered inside the modal instead of body
                                    container: () => modalContentRef.current || document.body,
                                    modifiers: [
                                        {
                                            name: "preventOverflow",
                                            options: {
                                                boundary: "viewport",
                                            },
                                        },
                                    ],
                                    sx: {
                                        zIndex: 2000, // must be higher than Chakra modal backdrop 
                                    },
                                },
                                textField: {
                                    variant: "outlined",
                                    fullWidth: true,
                                    // Styles applied to the TextField's input component
                                    InputProps: {
                                        sx: {
                                            borderRadius: 999,
                                            fontSize: 14,
                                            height: "50px",
                                            pb: "4px",
                                            "& fieldset": {
                                                borderRadius: 999,
                                                fontSize: 14,
                                                height: "50px",
                                                pb: "4px",
                                            },
                                        },
                                    },
                                    // Extra safety if your theme switches variants
                                    sx: {
                                        "& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInputBase-root": {
                                            borderRadius: 999,
                                            fontSize: 14,
                                            minHeight: "auto",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderRadius: 999,
                                            minHeight: "auto",
                                        },
                                    },
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Flex> */}
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

            {/* <Flex display={["flex", "flex", "none"]} >
                        <MobileDatePicker
                            disableFuture
                            value={dayjs(value)}
                            format="MM/DD/YYYY"
                            maxDate={dayjs().subtract(18, "year")} // 🔒 prevent selecting under 18
                            onChange={(date) =>  changeHandler(date)}
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    fullWidth: true,
                                    inputProps: { readOnly: true }, // avoids keyboard opening
                                    InputProps: {
                                        sx: {
                                            borderRadius: 999,
                                            fontSize: 14,
                                            height: "50px",
                                            pb: "4px",
                                            "& fieldset": {
                                                borderRadius: 999,
                                                fontSize: 14,
                                                height: "50px",
                                                pb: "4px",
                                            },
                                        },
                                    },
                                    sx: {
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 999, // pill style
                                            height: 50,
                                            fontSize: 14,
                                            "& input": {
                                                fontSize: 14,
                                                padding: "8px 12px",
                                                borderRadius: 999,
                                            },
                                        },
                                    },
                                },
                                dialog: {
                                    // styles for the popup dialog
                                    sx: {
                                        "& .MuiPaper-root": {
                                            borderRadius: 999,
                                            padding: 2,
                                        },
                                    },
                                },
                            }}
                        />
                    </Flex>*/}
        </Flex>
    )
}

