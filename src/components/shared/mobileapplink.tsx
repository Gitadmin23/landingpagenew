import { Flex, Button, Image } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"

type IProps = {
    width?: string,
    height?: string
}

function MobileAppLink(props: IProps) {

    const {
        width,
        height
    } = props

    const handleToast = () => {

        toaster.create({
            title: `Infomation`,
            description: "Coming soon",
            type: "info",
            closable: true
        }) 
    }
 
    return (
        <Flex gap={"2"} w={"fit-content"} >
            <Button onClick={handleToast} h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/apple.png" alt="apple" w={"full"} objectFit={"cover"} rounded={"8px"} />
            </Button>
            <Button onClick={handleToast} h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/google.png" alt="apple" w={"full"} objectFit={"cover"} rounded={"8px"} />
            </Button>
        </Flex>
    )
}

export default MobileAppLink