import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Header from '../../components/common/Header'
import AddShoeForm from './AddShoeForm'

const AddShoe = () => {
    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar />
            <Box flex={1} px={8}>
                <Box my={6}>
                    <Header text={'add shoe'} color={'vdark'} />
                </Box>
                <AddShoeForm />
            </Box>
        </Box>
    )
}

export default AddShoe