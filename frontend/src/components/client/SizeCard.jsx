import { Box, Button, Flex, Text } from '@chakra-ui/react'

const SizeItem = ({ size }) => {
    return (
        <Button m={{ base: 1, md: 2 }} w={{ base: 'calc(25% - 8px)', md: 'calc(33% - 16px)' }} size={{ base: 'xs', sm: 'md' }} variant={'outline'}>
            <Text fontWeight={'400'} fontSize={'xs'} as='span'>{size}</Text>
        </Button>
    )
}

const size = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']

const SizeCard = () => {
    return (
        <Box as={Flex} flexFlow={'wrap'}>
            <Text fontSize={'sm'} p={2}>Size:</Text>
            <Box>
                {
                    size.map((z, index) => (
                        <SizeItem key={index} size={z} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default SizeCard 