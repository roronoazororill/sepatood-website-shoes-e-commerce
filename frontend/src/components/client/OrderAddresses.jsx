import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, useTab, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiEdit, FiDelete, FiEye, FiTrash } from 'react-icons/fi'
import { ButtonDark, ButtonRed } from '../common/Buttons'
import axios from 'axios'

const AddressCard = ({ isActive, handleClickProp, id, data }) => {
    const address = data
    if (!address) {
        return
    }

    return (
        <Box id={id} onClick={() => handleClickProp ? handleClickProp(id, address._id) : ''} p={1} cursor={'pointer'} >
            <Box mb={4}>
                <Text fontSize={'md'} color={isActive ? 'vsecondary' : 'vdark'} fontWeight={'600'}>{address.label}</Text>
            </Box>
            <Box as={Stack} fontSize={{ base: 'xs', sm: 'sm' }} gap={2}>
                <Text >{address.recipient}</Text>
                <Text >{`${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`}
                </Text>
                <Text>
                    {address.street}
                </Text>
            </Box>
        </Box>
    )
}

const AddressList = ({ onClose, isOpen, addresses, setSelectedAddress, setTriggerFetch }) => {
    const [isActive, setActive] = useState(null)
    const toggleActive = (id) => {
        setActive(isActive === id ? null : id)

    }

    const handleClick = (id, addressId) => {
        toggleActive(id)
        setSelectedAddress(addressId)
    }

    const handleDeleteAddress = async (addressId) => {
        try {
            const response = await axios.delete('http://localhost:4000/api/address/', {
                params: {
                    addressId: addressId
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal onClose={onClose} size={'lg'} isOpen={isOpen} isCentered scrollBehavior={'inside'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Your Address</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack gap={4} >
                        {addresses.map((addres, index) => (
                            <Box key={index}>
                                <Flex justifyContent={'space-between'}>
                                    <AddressCard data={addres} id={index + 1} handleClickProp={handleClick} isActive={isActive == index + 1} />
                                    <Stack>
                                        <EditAddress setTriggerFetch={setTriggerFetch} addressId={addres._id} />
                                        <DeleteAddress setTriggerFetch={setTriggerFetch} addressId={addres._id} onDelete={handleDeleteAddress} />
                                    </Stack>
                                </Flex>
                                <Divider />
                            </Box>

                        ))}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Stack w={'full'} direction={'row'} gap={6} borderTop={'1px solid black'} pt={4}>
                        <Box onClick={onClose} w={'full'}>
                            <ButtonDark text={'Select address'} />
                        </Box>
                        <AddressForm setTriggerFetch={setTriggerFetch} />
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const DeleteAddress = ({ onDelete, addressId, setTriggerFetch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const handleDelete = () => {

        onDelete(addressId)
        toast({
            title: 'Success',
            description: 'Address deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
        setTriggerFetch(true)
        onClose()
    }
    const handleCancel = () => {
        toast({
            title: 'Error',
            description: 'Can`t delete address',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
        onClose()
    }
    return (
        <>
            <Button fontSize={'xl'} onClick={onOpen} variant={'ghost'}><FiTrash /></Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent p={6}>
                    <ModalHeader>Delete Address!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure to delete this address?
                    </ModalBody>

                    <ModalFooter mt={8} as={Flex} justifyContent={'space-between'}>
                        <Box onClick={handleCancel}>
                            <ButtonDark text={'Cancel'} />

                        </Box>
                        <Box onClick={handleDelete}>
                            <ButtonRed text={'Yes'} />
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


const EditAddress = ({ addressId, setTriggerFetch }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [address, setAddress] = useState('')
    const [data, setData] = useState('')

    const userId = localStorage.getItem('user')
    const getAddress = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/address/${addressId}`)
            setData(response.data)
            setStreet(response.data.street)
            setCity(response.data.city)
            setState(response.data.state)
            setPostalCode(response.data.postalCode)
            setCountry(response.data.country)
            setUser(response.data.user)
            setLabel(response.data.label)
            setRecipient(response.data.recipient)
            setUser(userId)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        if (addressId) {
            getAddress()
        }
        onOpen()
    }

    useEffect(() => {
        setAddress(data)
    }, [data])



    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [user, setUser] = useState('');
    const [label, setLabel] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleUpdate = async (e) => {

        e.preventDefault(e)
        try {
            const response = await axios.put(`http://localhost:4000/api/address`, { street, city, state, postalCode, country, user, label, recipient }, {
                params: {
                    addressId: addressId
                }
            })
            setAddress(response.data)
        } catch (error) {
            console.log(error)
        }
        setTriggerFetch(true)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }
    return (
        <>
            <Button onClick={handleClick} variant={'ghost'} w={'full'}><FiEdit /></Button>
            <Modal onClose={onClose} size={'lg'} isOpen={isOpen} isCentered scrollBehavior={'inside'}>
                <ModalOverlay />
                <ModalContent as={'form'} onSubmit={handleUpdate}>
                    <ModalHeader>Update Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Stack gap={4}>
                                <FormInput name={'Label'} onChange={(e) => setLabel(e.target.value)} value={label} />
                                <Flex>
                                    <FormInput name={'Recepient name'} onChange={(e) => setRecipient(e.target.value)} value={recipient} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'Country'} onChange={(e) => setCountry(e.target.value)} value={country} />
                                    <FormInput name={'State'} onChange={(e) => setState(e.target.value)} value={state} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'City'} onChange={(e) => setCity(e.target.value)} value={city} />
                                    <FormInput name={'PostalCode'} onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'Street'} onChange={(e) => setStreet(e.target.value)} value={street} />
                                </Flex>
                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent={'space-between'} gap={6} w={'full'}>
                            <Box onClick={handleCancel}>
                                <ButtonDark type={'button'} text={'Cancel'} />
                            </Box>
                            <Box>
                                <ButtonRed type={'submit'} text={'Save'} />
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const FormInput = ({ name, value, ...rest }) => {
    return (
        <FormControl m={2}>
            <FormLabel fontSize={'sm'} mb={0}>{name}</FormLabel>
            <Input value={value} {...rest} px={0} fontSize={'xs'} border={'none'} rounded={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: 'none' }} type='text' />
            <Divider borderColor={'gray.400'} />
        </FormControl>
    )
}

const AddressForm = ({ setTriggerFetch }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [label, setLabel] = useState('');
    const [recipient, setRecipient] = useState('');
    const toast = useToast()


    const addUser = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/address/', { street, city, state, postalCode, country, label, user, recipient })
        } catch (error) {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!street || !city || !state || !postalCode || !country || !label || !recipient) {
            toast({
                title: 'Error',
                description: 'Please fill all field!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        } else {
            addUser()
            toast({
                title: 'Success',
                description: 'Address added successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setTriggerFetch(true)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }


    return (
        <>
            <Box onClick={onOpen} w={'full'}>
                <ButtonRed text={'Add Address'} />
            </Box>
            <Modal onClose={onClose} size={'lg'} isOpen={isOpen} isCentered scrollBehavior={'inside'}>
                <ModalOverlay />
                <ModalContent as={'form'} onSubmit={handleSubmit}>
                    <ModalHeader>Add Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Stack gap={4}>
                                <FormInput name={'Label'} onChange={(e) => setLabel(e.target.value)} value={label} />
                                <Flex>
                                    <FormInput name={'Recepient name'} onChange={(e) => setRecipient(e.target.value)} value={recipient} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'Country'} onChange={(e) => setCountry(e.target.value)} value={country} />
                                    <FormInput name={'State'} onChange={(e) => setState(e.target.value)} value={state} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'City'} onChange={(e) => setCity(e.target.value)} value={city} />
                                    <FormInput name={'PostalCode'} onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
                                </Flex>
                                <Flex>
                                    <FormInput name={'Street'} onChange={(e) => setStreet(e.target.value)} value={street} />
                                </Flex>
                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent={'space-between'} gap={6} w={'full'}>
                            <Box onClick={handleCancel}>
                                <ButtonDark type={'button'} text={'Cancel'} />
                            </Box>
                            <Box>
                                <ButtonRed type={'submit'} text={'Save'} />
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const OrderAddresses = ({ setOrderAddress }) => {

    const userId = localStorage.getItem('user')
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')

    const [triggerFetch, setTriggerFetch] = useState(true)

    const fetchData = async (userId) => {
        try {
            const response = await axios.get('http://localhost:4000/api/address/', {
                params: {
                    userId: userId
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getAddress = async (addressId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/address/${addressId}`)
            setAddress(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchData(userId)
                .then(data => {
                    setAddresses(data)
                    setAddress(data[0])
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {
                    setTriggerFetch(false)
                })
        }
        if (selectedAddress) {
            getAddress(selectedAddress)
        }
        setOrderAddress(address)
    }, [userId, triggerFetch, selectedAddress])

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <Box as={Flex} justifyContent={'space-between'} alignItems={'start'}>
                <AddressCard data={address} />
                <Button onClick={onOpen} variant={'ghost'} fontWeight={'400'} fontSize={'sm'}>
                    Ubah
                </Button>
                <AddressList setTriggerFetch={setTriggerFetch} setSelectedAddress={setSelectedAddress} addresses={addresses} isOpen={isOpen} onClose={onClose} />
            </Box>
            Address  </Box>
    )
}

export default OrderAddresses