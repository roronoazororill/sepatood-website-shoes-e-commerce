import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ShoeData from '../../utils/shoeData';
import { ButtonDark, ButtonRed } from '../common/Buttons';
import axios from 'axios';
import useFormatPrice from '../../hooks/useFormatPrice';
import PriceTag from '../common/PriceTag';

const DeleteCart = ({ onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const hadleDeleteItem = () => {

    }

    const handleDelete = () => {
        onDelete()
        toast({
            title: 'Success',
            description: 'Success remove shoe from cart!',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
        onClose()
    }
    const handleCancel = () => {
        onClose()
    }
    return (
        <>
            <Button fontSize={'xl'} onClick={onOpen} variant={'ghost'}><FiTrash /></Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent p={6}>
                    <ModalHeader>Delete shoe?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure to delete this shoe!
                    </ModalBody>

                    <ModalFooter mt={8} as={Flex} justifyContent={'space-between'}>
                        <Box onClick={handleCancel}>
                            <ButtonDark text={'cancel'} />

                        </Box>
                        <Box onClick={handleDelete}>
                            <ButtonRed text={'yes'} />
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const CartItem = ({ imgUrl, size, name, price, userId, shoeId }) => {
    const toast = useToast()

    const handleDeleteItem = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/cart/remove', { userId, shoeId })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Box borderBottom={'1px solid gray'} >
            <Box as={Flex} alignItems={'center'}>
                <Box flex={1}>
                    <Image src={imgUrl} />
                </Box>
                <Box flex={3} >
                    <Box p={4}>
                        <Text fontSize={{ base: 'sm', sm: 'md' }} fontWeight={'600'}>{name}</Text>
                        <Flex fontSize={{ base: 'xs', sm: 'sm' }} alignItems={'center'}>
                            <Text me={6} >Size {size}</Text>
                            {/* <Flex alignItems={'center'}>
                                <Button variant={'ghost'} size={'sm'} onClick={decreaseAmount}>
                                    -
                                </Button>
                                <Text px={4}>{amount}</Text>
                                <Button variant={'ghost'} size={'sm'} onClick={increaseAmount}>
                                    +
                                </Button>
                            </Flex> */}
                        </Flex>
                        <Text fontSize={'xs'} fontWeight={'600'}><PriceTag price={price} /></Text>
                    </Box>
                </Box>
                <Box flex={1}>
                    <IconButton variant={'ghost'} >
                        <DeleteCart onDelete={handleDeleteItem} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

const Cart = ({ isOpen, onClose }) => {
    const userId = localStorage.getItem('user')
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/cart/${userId}`)
            setItems(response.data.cart.items)
            setTotalPrice(response.data.cart.totalPrice)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (userId) {
            fetchData()
        }

    }, [items])


    const navigate = useNavigate()
    const handleCheckout = () => {
        navigate('/checkout')
    }
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={'md'}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader >SHOPPING CART</DrawerHeader>
                <DrawerBody>
                    <Box as={Flex} flexDir={'column'} gap={6}>
                        {items.map((item, index) => (
                            <CartItem key={index} userId={userId} shoeId={item.shoeId} imgUrl={item.image} name={item.shoeName} size={item.size} price={item.price} />
                        ))}
                    </Box>
                </DrawerBody>
                <DrawerFooter>
                    <Box p={4} w={'full'} borderTop={'1px solid gray'}>
                        <Text textAlign={'start'} mb={4} fontWeight={'600'}>Total: {<PriceTag price={totalPrice} />}</Text>
                        <Box onClick={handleCheckout}>
                            <ButtonRed text={'Checkout'} />
                        </Box>
                    </Box>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Cart