import { Box, Flex, Stack, Heading, useToast } from '@chakra-ui/react'
import Navbar from '../../components/admin/Navbar'
import FormInput from '../../components/admin/FormInput'
import { ButtonDark } from '../../components/common/Buttons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/admin/login', { email, password });
            console.log(response)

            const { admin } = response.data;
            localStorage.setItem('admin', admin._id);
            window.location.reload()


        } catch (error) {
            toast({
                title: 'Error',
                description: 'Email atau password salah!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            console.error('Login failed:', error);
        }

    };

    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar />
            <Box flex={1} px={8} as={Flex} justifyContent={'center'} alignItems={'center'}>
                <Box bg={'vlight'} w={'3xl'} p={12}>
                    <Flex
                        mb={12}
                        justifyContent={'start'}
                        alignItems={'center'}
                        _before={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: 'black',
                            flexGrow: 1,
                            mr: 8,
                        }}
                        _after={{
                            content: '""',
                            borderBottom: '1px solid',
                            borderColor: 'black',
                            flexGrow: 1,
                            ml: 8,
                        }}
                    >
                        <Heading fontSize={'4xl'} fontWeight={'extrabold'} m={0} color={'valbisque'} textTransform={'uppercase'}>LOGIN ADMIN</Heading>
                    </Flex>
                    <form onSubmit={handleSubmit}>
                        <Stack >
                            <FormInput value={email} onChange={(e) => setEmail(e.target.value)} label={'Email'} type={'email'} />
                            <FormInput value={password} onChange={(e) => setPassword(e.target.value)} label={'Password'} type={'password'} />
                        </Stack>
                        <Flex mt={12} w={'full'}>
                            <ButtonDark type={'submit'} text={'Login'} />
                        </Flex>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLogin