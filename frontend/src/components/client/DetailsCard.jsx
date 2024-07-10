import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


const DetailCard = ({ label, text }) => {

    return (
        <Box as={Stack}>
            <Text fontSize={'sm'} textTransform={'uppercase'} fontWeight={'600'}>{label}</Text>
            <Text fontSize={'md'}>{text}</Text>
        </Box>
    )
}
const DetailsCard = ({ data }) => {

    const [shoe, setShoe] = useState({
        brand: '',
        model: '',
        color: '',
        size: '',
        condition: '',
        price: ''
    });

    useEffect(() => {
        if (data) {
            setShoe(data);
        }
    }, [data]);

    return (
        <Box py={6}>
            <Stack gap={6}>
                <TableContainer>
                    <Table>
                        <Tbody>
                            <Tr>
                                <Td><DetailCard label={'Brand'} text={shoe.brand} /></Td>
                                <Td><DetailCard label={'Model'} text={shoe.model} /></Td>
                            </Tr>
                            <Tr>
                                <Td><DetailCard label={'Color'} text={shoe.color} /></Td>

                                <Td><DetailCard label={'Size'} text={shoe.price} /></Td>
                            </Tr>
                            <Tr>
                                <Td><DetailCard label={'Condition'} text={shoe.condition} /></Td>
                                <Td><DetailCard label={'Price'} text={shoe.price} /></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    )
}

export default DetailsCard