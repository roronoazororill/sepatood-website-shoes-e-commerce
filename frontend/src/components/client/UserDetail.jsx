import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ButtonDark, ButtonRed } from '../common/Buttons'
import axios from 'axios'

const FormInput = ({ label, value, ...rest }) => {
    return (
        <FormControl  {...rest} m={2}  >
            <FormLabel textTransform={'uppercase'} color={'black'} fontSize={'xs'} mb={0}>{label}</FormLabel>
            <Input cursor={'default'} value={value} px={0} fontSize={'xs'} border={'none'} rounded={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: 'none' }} type='text' />
            <Divider borderColor={'gray.400'} />
        </FormControl>
    )
}

const DetailItem = ({ label, value }) => {
    return (
        <Box>
            <Text textTransform={'uppercase'} fontSize={'xs'}>{label}</Text>
            <Text fontSize={'md'}>{value}</Text>
            <Divider borderColor={'gray.400'} />
        </Box>
    )
}

const EditProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userId = localStorage.getItem('user')
    const [user, setUser] = useState({})
    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${userId}`)
            setUser(response.data)
            setUsername(response.data.username)
            setPhone(response.data.phone)
        } catch (error) {
            console.log(error)
        }
    }

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (userId) {
            getUser()

        }
    }, [])



    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/api/user/${userId}`, { username, phone })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Box onClick={onOpen} w={'full'}>
                <ButtonRed text={'Edit profile'} />
            </Box>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Edit Profile
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p={2} as='form' onSubmit={handleUpdate}>
                            <Stack gap={4}>
                                <FormInput onChange={(e) => setUsername(e.target.value)} value={username} label={'username'} />
                                <FormInput onChange={(e) => setPhone(e.target.value)} value={phone} label={'phone'} />
                            </Stack>
                            <Flex gap={6} justifyContent={'space-between'}>
                                <Box mt={4} onClick={onClose}>
                                    <ButtonDark text={'Back'} />
                                </Box>
                                <Box mt={4} onClick={onClose}>

                                    <ButtonRed type={'submit'} text={'Save'} />
                                </Box>
                            </Flex>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}




const ProfileDetails = ({ data }) => {
    const user = data
    return (
        <Box p={16} pb={8} w={'full'} bg={'vlight'}>
            <Stack gap={6} >
                <DetailItem label={'username'} value={user.username} />
                <DetailItem label={'email'} value={user.email} />
                <DetailItem label={'phone'} value={user.phone} />
                <Flex mt={8} w={'full'} >
                    <EditProfile />
                </Flex>
            </Stack>
        </Box>
    )
}

export default ProfileDetails