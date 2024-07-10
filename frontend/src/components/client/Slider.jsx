import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react'
import ScrollCarousel from 'scroll-carousel-react'


const SliderCard = () => {
    return (
        <Card mx={8} w={'500px'} >
            <CardBody p={0} display={'flex'} flexDirection={'row'}>
                <Box position={'absolute'} top={0} right={0} textAlign={'end'} p={4}>
                    <Text fontSize={'xl'}>Retrograde Hi Grape</Text>
                    <Text>IDR 700.000</Text>
                </Box>
                <Box bg={'gray.800'} w={'100px'} as={Flex} justifyContent={'center'}>
                    <Heading color={'white'} verticalAlign={'middle'} css={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright'
                    }}>
                        HOT SALE
                    </Heading>
                </Box>
                <Image boxSize={'100%'} objectPosition={'center'} objectFit={'cover'} src={'/shoes/retrograde-grape.png'} />
            </CardBody>
        </Card>
    )
}

const Slider = () => {
    return (
        <Box py={16} bg={'gray.100'}>
            <Box p={1} border={'2px solid black'}>
                <ScrollCarousel autoplay autoplaySpeed={8} speed={7}>
                    <SliderCard />
                    <SliderCard />
                    <SliderCard />
                    <SliderCard />
                </ScrollCarousel>
            </Box>

        </Box>
    )
}

export default Slider