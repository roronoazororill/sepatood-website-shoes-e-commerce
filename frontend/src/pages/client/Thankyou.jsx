import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import useGetData from '../../hooks/useGetData'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Thankyou = ({ userId }) => {

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${userId}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) {

            getUser()
        }
        setTimeout(() => {
            navigate('/shop')
        }, 5000)
    }, [userId])

    return (
        <Box bg={'vdark'} w={'full'} h={'100vh'} as={Flex} direction={'column'} justifyContent={'center'} >
            <Header color={'vprimary'} text={'thank you'} />
            <Header color={'vsecondary'} text={`${user.username}`} />
        </Box>
    )
}

export default Thankyou