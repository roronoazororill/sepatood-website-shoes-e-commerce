import { Box, Flex, Stack, Heading, useToast, Button } from '@chakra-ui/react'
import Navbar from '../../components/client/Navbar'
import FormInput from '../../components/common/FormInput'
import { ButtonDark } from '../../components/common/Buttons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePostData from '../../hooks/usePostData'
import axios from 'axios'

const LogInButton = () => {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate('/login')} size={'md'} px={8} py={4} borderRadius={'none'} variant={'outline'} colorScheme={'white'}>
            LOGIN
        </Button>
    )
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password || !confirmPassword || !username || !phone) {
            toast({
                title: 'Error',
                description: 'Mohon lengkapi semua field!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            return;
        } else if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Login gagal, Periksa email atau password anda!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        } else {

            try {
                const response = await axios.post('http://localhost:4000/api/user/signup', { email, username, phone, password, confirmPassword });
                const { user } = response.data;
                localStorage.setItem('user', user._id);
                window.location.reload()
            } catch (err) {
                toast({
                    title: 'Error',
                    description: `${err.response.data.message}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });
            }
        }
    };

    return (
        <Box as={Flex} direction={'column'} minH={'100vh'} bg={'vprimary'}  >
            <Navbar children={<LogInButton />} />
            <Box flex={1} p={8} as={Flex} justifyContent={'center'} alignItems={'center'}>
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
                        <Heading fontSize={'4xl'} fontWeight={'extrabold'} m={0} color={'valbisque'} textTransform={'uppercase'}>Signup</Heading>
                    </Flex>
                    <form onSubmit={handleSubmit}>
                        <Stack >
                            <FormInput onChange={(e) => setUsername(e.target.value)} label={'username'} type={'text'} />
                            <FormInput onChange={(e) => setEmail(e.target.value)} label={'Email'} type={'email'} />
                            <FormInput onChange={(e) => setPhone(e.target.value)} label={'phone'} type={'text'} />
                            <FormInput onChange={(e) => setPassword(e.target.value)} label={'Password'} type={'password'} />
                            <FormInput onChange={(e) => setConfirmPassword(e.target.value)} label={'Confirm Password'} type={'password'} />
                        </Stack>
                        <Flex mt={12} w={'user'}>
                            <ButtonDark type={'submit'} text={'Signup'} />
                        </Flex>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup