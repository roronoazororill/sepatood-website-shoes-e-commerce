import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Header from '../../components/common/Header'
import EditShoeForm from './EditShoeForm'


const EditShoe = () => {
    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar />
            <Box flex={1} px={8}>
                <Box my={6}>
                    <Header text={'Edit shoe'} color={'vdark'} />
                </Box>
                <EditShoeForm />
            </Box>
        </Box>
    )
}

export default EditShoe