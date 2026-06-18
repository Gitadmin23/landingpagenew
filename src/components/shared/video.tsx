import { Flex } from "@chakra-ui/react";
import YouTube from "react-youtube";


interface IProps { 
    video?: boolean,
    url?: string
}

const opts = {
    height: '330',
    width: '512',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
    control: false
};

const optsmobile = {
    height: '220',
    width: '320',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
};

const CustomVideo = (props: IProps) => {

    const {
        url
    } = props

    return (
        <Flex w={"full"} h={["220px", "220px", "330px"]} bgColor={"white"} justifyContent={"center"} rounded={"14px"} alignItems={"center"}  >
            <Flex display={["none", "none", "flex"]} >
                <YouTube className=" videoborder " videoId={url} opts={opts} />
            </Flex>
            <Flex display={["flex", "flex", "none"]} >
                <YouTube className=" videoborder " videoId={url} opts={optsmobile} />
            </Flex>
        </Flex>
    )
}

export default CustomVideo