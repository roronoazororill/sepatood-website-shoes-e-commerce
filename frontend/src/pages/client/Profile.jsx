import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import Navbar from "../../components/client/Navbar"
import UserDetails from "../../components/client/UserDetail"
import UserOrders from "../../components/client/UserOrders"
import axios from "axios"
import { useEffect, useState } from "react"

const Profile = () => {

    const [user, setUser] = useState('')
    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${id}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('user');

        if (id) {
            fetchData(id);
        }
    }, [])

    return (
        <Box as={Flex} direction={'column'} minH={'100vh'}>
            <Navbar />
            <Box flex={1} >
                <Flex flexDirection={'column'}>
                    <Box h={'30vh'} bg={'vdark'} color={'vprimary'} as={Flex} justifyContent={'center'} alignItems={'center'}>
                        <Text fontSize={'2xl'}> Hi! {user.username}</Text>
                    </Box>
                    <Box p={8} bg={'vprimary'}>
                        <UserDetails data={user} />
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Profile