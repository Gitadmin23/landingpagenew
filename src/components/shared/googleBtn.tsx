import { GoogleIcon } from "@/svg";
import { Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "./modalLayout";
import useGoogle from "@/hooks/useGoogle";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react"; 

interface IProps {
    title?: string
}

export default function GoogleBtn({
    title
}: IProps) {

    const { signInWithGoogle, checking, signInPending } = useGoogle()

    const { data: session, status } = useSession();

    const token: any = session

    const handleGoogleLogin = () => {
        signIn('google'); // starts Google sign-in flow
    }; 

    useEffect(()=> {
        if(token?.token?.idToken) {
            signInWithGoogle(token?.token?.idToken)
        }
    }, [status]) 

    return (
        <>
            <Button onClick={handleGoogleLogin} loading={signInPending || checking} as={"button"} mt={"4"} h={"50px"} w={"full"} bgColor={"#F7F7F7"} rounded={"32px"} gap={"3"} justifyContent={"center"} alignItems={"center"} >
                <GoogleIcon />
                <Text fontSize={"14px"} color={"#111111"} textAlign={"center"} fontWeight={"500"} >{title ? title : "Signup"} with Google</Text>
            </Button>
            <ModalLayout trigger={true} >
                <Flex gap={"4"} width={"full"} mt={"3"} >

                </Flex>
            </ModalLayout>
        </>
    )

}
