import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

const FeaturedImage = () => {
    return (
        <Box maxH={{ md: '400px' }} bg={'vdark'} color={'vprimary'}>
            <Flex h={'full'} direction={{ base: 'column', md: 'row' }} >
                <Box as={Flex} direction={'column'} flex={1} p={16} justifyContent={'center'} >
                    <Heading size={{ base: 'sm', md: 'xl' }} textTransform={'uppercase'} >
                        Step into Style: Where Every Step is a Fashion Statement
                    </Heading>
                    <Text mt={2} fontSize={'x-small'}>
                        Where Every Step is a Stylish Adventure! Explore our exclusive collection of footwear designed to enhance your comfort, complement your style, and elevate your confidence. Step in and discover the perfect pair to express your unique personality. We're here to help you put your best foot forward!
                    </Text>
                </Box>
                <Box flex={1}  >
                    <Box w={'full'}>
                        <Image maxH={'400px'} objectFit={'cover'} src='featured-img.png' />
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default FeaturedImage
