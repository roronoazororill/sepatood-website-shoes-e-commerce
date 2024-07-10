import React, { useEffect } from 'react'
import Navbar from '../../components/client/Navbar'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { ButtonRed } from '../../components/common/Buttons'
import { Link } from 'react-router-dom'



const LandingPage = () => {
    useEffect(() => {
        const video = document.getElementById('myVideo');
        video.play();
    }, []);
    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} overflow={'hidden'}>
            <Navbar />
            <Box as={Stack} flex={1} bg={'valblack'}>
                <Box maxH={'50vh'} w={'full'}>
                    <video width={'100%'} id='myVideo' autoPlay loop muted='muted'>
                        <source src="/videos/AIR-MAX-97.mp4" type="video/mp4" />
                    </video>
                </Box>
                <Box position={'absolute'} w={'full'} top={'40%'} as={Stack} justifyContent={'center'} alignItems={'center'}>
                    <Heading fontSize={'6xl'} textAlign={'center'} fontWeight={'bold'} color={'vprimary'} textTransform={'uppercase'}>
                        Footwear <br /> Elevated Everywhere
                    </Heading>
                    <Box as={Link} to={'/shop'}>
                        <Box w={'400px'}>
                            <ButtonRed text={'continue'} ></ButtonRed>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LandingPage