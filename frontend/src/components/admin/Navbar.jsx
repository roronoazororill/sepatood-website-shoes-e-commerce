import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const Logo = () => {
    return (
        <Box cursor={'pointer'}>
            <Heading fontSize={'3xl'}>
                Sepatood<Text as='span' color={'red'}>.</Text>
            </Heading>
        </Box>
    )
}

const Navbar = () => {

    const location = useLocation()
    const isLoginPath = location.pathname === '/admin/login'


    const handleLogout = () => {
        localStorage.removeItem('admin')
        window.location.reload()
    }
    return (
        <>
            <Box bg={'vdark'} color={'vlight'} borderBottom={'1px solid gray'} position={'sticky'} w={'full'} top={0} zIndex={10}>
                <Flex px={{ base: 2, sm: 8 }} h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Logo />
                    {isLoginPath ? null : <Button onClick={handleLogout} borderRadius={'none'}>Logout</Button>}

                </Flex>
            </Box>
        </>
    )
}

export default Navbar