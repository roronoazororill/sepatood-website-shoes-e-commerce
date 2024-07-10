import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react"
import Navbar from "../../components/client/Navbar"
import OrderDetails from "../../components/client/OrderDetails"
import { ButtonDark, ButtonRed } from "../../components/common/Buttons"
import { useEffect, useState } from "react"
import axios from "axios"
import PriceTag from "../../components/common/PriceTag"
import { useNavigate } from "react-router-dom"
const Checkout = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem('user')

    const [delivery, setDelivery] = useState('')
    const [address, setAddress] = useState('')
    const [cart, setCart] = useState('')
    const [itemsPrice, setItemsPrice] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    const calculateTotal = (itemsCost, deliveryCost) => {
        if (deliveryCost) {
            setTotalPrice(itemsCost + deliveryCost)
        } else {
            setTotalPrice(itemsCost)
        }
    }

    const toast = useToast()
    const checkout = async () => {

        const data = {
            orderId: userId + cart.id + new Date().getTime(),
            totalPrice: totalPrice
        }
        if (!delivery.cost) {
            toast({
                title: 'Error',
                description: 'Please choose delivery addres!!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            return
        }
        const response = await axios.post('http://localhost:4000/api/payment/', { orderId: data.orderId, totalPrice: data.totalPrice })
        console.log(response)
        const requestData = response.data
        window.snap.pay(requestData.token)
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/cart/${userId}`)
            setItemsPrice(response.data.cart.totalPrice)
            setCart(response.data.cart)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
        calculateTotal(itemsPrice, delivery.cost)

    }, [delivery, address, itemsPrice])
    return (
        <Box as={Flex} direction={'column'} bg={'vprimary'} minH={'100vh'} >
            <Navbar />
            <Box flex={1} as={Flex} px={8} justifyContent={'center'}>
                <Box minW={{ base: '100%', sm: '50%' }} p={6} bg={'vlight'} >
                    <OrderDetails setOrderDelivery={setDelivery} setOrderAddress={setAddress} />
                    <Flex my={4} p={4} justifyContent={'space-between'}>
                        <Text fontSize={'medium'} fontWeight={'500'}>Total: </Text>
                        <Text fontSize={'medium'} fontWeight={'500'} >{<PriceTag price={totalPrice} />} </Text>
                    </Flex>
                    <Box mt={6} as={Flex} gap={6}>
                        <Box w={'full'} onClick={() => navigate('/shop')}>
                            <ButtonDark text={'Back'} />
                        </Box>
                        <Box w={'full'} onClick={checkout}>
                            <ButtonRed text={'pay'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>


    )
}

export default Checkout