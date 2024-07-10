import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import {
    FiSearch,
    FiShoppingCart,
    FiUser
} from 'react-icons/fi'
import Cart from './Cart'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Logo = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/shop')
    }
    return (
        <Box onClick={handleNavigate} cursor={'pointer'}>
            <Heading fontSize={'3xl'}>
                Sepatood<Text as='span' color={'red'}>.</Text>
            </Heading>
        </Box>
    )
}

const NavIcon = (props) => {
    const { children, onClick, href } = props
    return (
        <Box onClick={onClick} as='a' href={href} cursor={'pointer'}>
            {children}
        </Box>
    )
}

const CartButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <NavIcon onClick={onOpen} >
                <FiShoppingCart />
            </NavIcon>
            <Cart isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const ProfileButton = () => {
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
        <NavIcon href={`/profile/${user.username}`} >
            <FiUser />
        </NavIcon>
    )
}

const SearchButton = () => {
    const navigate = useNavigate()

    return (
        <>
            <NavIcon onClick={() => navigate('/search')}>
                <FiSearch />
            </NavIcon>
        </>

    )
}

const Navbar = ({ children }) => {
    const location = useLocation()
    const isUserPath = location.pathname.includes('/profile/');

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <>
            <Box bg={'vdark'} color={'vlight'} borderBottom={'1px solid gray'} position={'sticky'} w={'full'} top={0} zIndex={10}>
                <Flex px={{ base: 2, sm: 8 }} h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Logo />
                    <HStack spacing={4}>
                        {children ? children : <>
                            <SearchButton />
                            <ProfileButton />
                            <CartButton />
                        </>}
                        {isUserPath ? <Button onClick={handleLogout} px={8} py={4} colorScheme='blackAlpha' size={'xs'} borderRadius={'none'} variant={'outline'} color={'vprimary'}>Logout</Button> : null}
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}

export default Navbar