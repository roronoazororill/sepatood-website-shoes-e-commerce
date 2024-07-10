import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../../components/client/Navbar'
import ProductDetails from '../../components/client/ProductDetails'

const Products = () => {
    return (
        <Box as={Flex} direction={'column'} minH={'100vh'}>
            <Navbar />
            <Box flex={1}>
                <ProductDetails />
            </Box>
        </Box>
    )
}

export default Products