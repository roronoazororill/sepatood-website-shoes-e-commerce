import React from 'react'
import ScrollCarousel from 'scroll-carousel-react'
import CarouselCard from './CarouselCard'
import { Box, Flex, Heading } from '@chakra-ui/react'
const Carousel = ({ data }) => {


    const shoes = data.filter((shoe) => shoe.condition === 'New')
    console.log(shoes)
    return (
        <Box py={20} bg={'valbisque'}>
            <Box zIndex={100}>
                <Flex
                    justifyContent={'start'}
                    alignItems={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: 'black',
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: 'black',
                        flexGrow: 1,
                        ml: 8,
                    }}
                >

                    <Heading fontSize={'5xl'} fontWeight={'extrabold'} m={0} color={'valred'} textTransform={'uppercase'}>New arrivals</Heading>
                </Flex>
            </Box>
            <Box zIndex={1} >
                <ScrollCarousel autoplay autoplaySpeed={8} speed={7}>
                    {shoes.map((shoe, index) => (
                        <CarouselCard key={index} brand={shoe.brand} model={shoe.model} price={shoe.price} imageUrl={shoe.images[0]} />
                    ))}
                </ScrollCarousel>
            </Box>
        </Box>

    )
}

export default Carousel