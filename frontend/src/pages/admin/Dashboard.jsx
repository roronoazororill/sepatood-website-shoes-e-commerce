import { Box, Flex, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/admin/Navbar'
import ShoesTable from './ShoesTable'
import Header from '../../components/common/Header'
import { ButtonDark, ButtonRed } from '../../components/common/Buttons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Dashboard = () => {
    const navigate = useNavigate()

    const [shoes, setShoes] = useState([])
    useEffect(() => {
        const fetchShoes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/shoe/');
                setShoes(response.data);
            } catch (error) {
                console.error('Error fetching shoes:', error);
            }
        };
        fetchShoes()
    }, [])

    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar />
            <Box flex={1} px={8}>
                <Box pb={24} pt={12}>
                    <Header color={'vdark'} text={'Shoes'} />
                    {shoes ? <ShoesTable data={shoes} /> : <Box py={16}><Header color={'vsecondary'} text={'Shoes empty'} /></Box>}
                </Box>
                <Box w={'xs'} onClick={() => navigate('/admin/add')} position={'fixed'} mx={8} bottom={0} right={0}>
                    <ButtonDark text={'add new'} />
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard