"use client"
import { Box, Flex, Grid } from '@chakra-ui/react'
import React, { useState } from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar' 
import { useElementScroll } from 'framer-motion'


interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) { 

    const reftwo: any = React.useRef(null)
    const { scrollY } = useElementScroll(reftwo)

    const [yaxis, setYaxis] = useState(0)

    React.useEffect(() => {
        const unsubscribeY = scrollY.onChange((latest) => { 
            setYaxis(latest)
        }) 
        return () => unsubscribeY()
    }, [scrollY])
 
    return (
        <Box overflow={"hidden"} w={"full"} bgColor={"white"} color={"black"} >
            <Grid h="100vh" w={"full"} overflow={"hidden"} >
                <HomeNavbar yaxis={yaxis} />
                <Flex w="full" h="full" overflow={"hidden"}>
                    <Flex ref={reftwo} w={"full"} h={"full"} flexDirection={"column"} overflowX={"hidden"} overflowY={"auto"} >
                        {children}
                        <FooterLandingPage />
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    )
}




