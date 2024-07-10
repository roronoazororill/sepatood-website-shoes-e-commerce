import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Header from '../../components/common/Header'
import ShoeDetails from './ShoeDetails'


const ShoeDetail = () => {

    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar />
            <Box flex={1} px={8}>
                <Box my={6}>
                    <Header text={'shoe detail'} color={'vdark'} />
                </Box>
                <ShoeDetails />
            </Box>
        </Box>
    )
}

export default ShoeDetail