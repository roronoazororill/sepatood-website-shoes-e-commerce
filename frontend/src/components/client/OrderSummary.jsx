import { Box, Button, Flex, Text } from "@chakra-ui/react"

const SummaryItem = ({ name, price }) => {
    return (
        <Flex w={'full'} fontSize={'sm'} justifyContent={'space-between'}>
            <Text>{name}</Text>
            <Text fontWeight={'600'}>Rp{price}</Text>
        </Flex>
    )
}


const OrderSummary = () => {
    return (
        <Box p={6} border={'1px solid black'} w={'full'}>
            <Box pb={4} borderBottom={'1px solid black'}>
                <Text fontSize={'3xl'} fontWeight={'600'}>Order Summary</Text>
            </Box>
            <Box py={4} as={Flex} flexDir={'column'} gap={6}>
                <SummaryItem name={'Subtotal'} price={'1400000'} />
                <SummaryItem name={'Delivery fee'} price={'15000'} />
                <SummaryItem name={'Payment fee'} price={'1000'} />
                <SummaryItem name={'Total'} price={'2000000'} />
            </Box>
            <Box pt={4}>
                <Button w={'full'} fontSize={'md'} fontWeight={'400'} size={'lg'}>Place Order</Button>
            </Box>
        </Box>
    )
}

export default OrderSummary