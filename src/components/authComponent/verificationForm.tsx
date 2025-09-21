import { Button, Flex, PinInput, Text } from "@chakra-ui/react";
import { CustomButton, ModalLayout } from "../shared";
import { usePathname, useSearchParams } from "next/navigation";
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";


export default function VerficationForm(
    {
        open,
        setOpen,
        setShow
    }: {
        open: boolean;
        setOpen: (item: boolean) => void
        setShow?: any
    }
) {

    const query = useSearchParams(); 
    const email = query?.get('email'); 
    const codequery = query?.get('code');

    const pathname = usePathname()

    const { initialTime, setInitialTime, startTimer, setStartTimer, sendingVerify, sendVerify, loadingVerify, verifyToken, setCode, code } = useAuth()

    useEffect(() => {
        if (initialTime > 0) {
            setTimeout(() => {
                setInitialTime(initialTime - 1);
            }, 1000);
        }

        if (initialTime === 0 && startTimer) {
            console.log("done");
            setStartTimer(false);
        }
    }, [initialTime, startTimer]);

    useEffect(()=> {
        if(email){
            setOpen(true)
            if(!pathname?.includes("forgot")){
                setShow(false)
            }
        } else if(codequery) {
            setOpen(false)
        }
    }, [email, codequery])

    return (
        <ModalLayout open={open} size={"xs"} trigger={true} close={() => setOpen(true)} >
            <Flex overflowY={"auto"} gap={"4"} px={"4"} py={"5"} alignItems={"center"} w={"full"} flexDir={"column"}  >
                <Flex flexDir={"column"} gap={"6px"} >
                    <Text fontSize={["20px", "20px", "20px"]} lineHeight={["18px", "18px", "30px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"700"} >Email Verification Code</Text>
                    <Text fontSize={"14px"} textAlign={"center"} >Enter the 6_digit code we sent to your email <span style={{ fontWeight: "500" }} >{email}</span></Text>
                </Flex>
                <PinInput.Root size={"xl"} onValueChange={(item) => setCode(item.valueAsString)} placeholder="0">
                    <PinInput.HiddenInput />
                    <PinInput.Control>
                        <PinInput.Input rounded={"2xl"} index={0} />
                        <PinInput.Input rounded={"2xl"} index={1} />
                        <PinInput.Input rounded={"2xl"} index={2} />
                        <PinInput.Input rounded={"2xl"} index={3} />
                        <PinInput.Input rounded={"2xl"} index={4} />
                        <PinInput.Input rounded={"2xl"} index={5} />
                    </PinInput.Control>
                </PinInput.Root>

                <Flex justifyContent={"start"} gap={"2"} px={"4"} >
                    <Flex w={"fit-content"} >
                        <FaCircleInfo color='red' size={"24px"} />
                    </Flex>
                    <Text fontSize={"14px"} textAlign={"left"} lineHeight={"120%"} >Please also check your spam or junk mail folder in case the verification code was filtered there.</Text>
                </Flex>
                {startTimer && (
                    <Text fontSize={"14px"} mt={"4"} textAlign={"center"} mx={"auto"} >Waiting to resend OTP in <span style={{ fontWeight: "500" }} >{0} : {initialTime} secs</span></Text>
                )}
                {!startTimer && (
                    <Flex justifyContent={"center"} w={"full"} >
                        <Button disabled={sendingVerify} h={"fit-content"} loading={sendingVerify} bg={"transparent"} _hover={{ backgroundColor: "transparent" }} color={"#233DF3"} onClick={() => sendVerify(email as string)}  >Resend</Button >
                    </Flex>
                )}
                <CustomButton text={"Verify"} onClick={() => verifyToken({ token: code })} color={"white"} isLoading={loadingVerify} disabled={loadingVerify || code.length !== 6} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={"full"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                    {/* <Text textAlign={"center"} fontWeight={"600"} >Verify</Text> */}
                </CustomButton>
            </Flex>
        </ModalLayout>
    )
}