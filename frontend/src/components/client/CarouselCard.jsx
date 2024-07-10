import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, Image, Stack, useStatStyles } from '@chakra-ui/react'
import PriceTag from '../common/PriceTag'
import useImageFormatter from '../../hooks/useImageFormatter'
const CarouselCard = ({ brand, model, price, imageUrl }) => {

    const [image, setImage] = useState()
    const { formatImage } = useImageFormatter()
    useEffect(() => {
        if (imageUrl) {

            setImage(formatImage(imageUrl))
        }
        console.log('xx', imageUrl)
    }, [imageUrl])
    return (
        <Box p={2} border={'1px solid black'} margin={4}>
            <Box w={'400px'} h={'200px'} bg={'vdark'} color={'vlight'}>
                <Box justifyContent={'center'} h={'200px'}
                    bgImage={`url(${image})`}
                    bgPosition="center"
                    bgRepeat="no-repeat"
                >
                    <Flex zIndex={0} h={'full'} direction={'column'} justifyContent={'space-between'}>
                        <Text p={2} fontSize={'5xl'} fontWeight={'bold'} textTransform={'uppercase'} >{brand + ' ' + model}</Text>
                    </Flex>
                </Box>
            </Box>
            <Box as={Stack} w={'full'} justifyContent={'center'} bg={'gray.200'}>
                <Text w={'full'} px={12} textAlign={'center'} fontWeight={'bold'} color={'vprimary'} bg={'vsecondary'} fontSize={'x-large'}><PriceTag price={price} /></Text>
            </Box>
        </Box>
    )
}

export default CarouselCard