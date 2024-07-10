import { Box, Flex, Image, Text } from '@chakra-ui/react'
import ShoeData from '../../utils/shoeData'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PriceTag from '../common/PriceTag'



const ShoesCard = ({ imgUrl, name, size, amount, price }) => {
    return (
        <Box as={Flex} borderBottom={'1px solid gray'}>
            <Box maxH={'100px'} aspectRatio={'1 / 1'}>
                <Image boxSizing={'border-box'} src={imgUrl} />
            </Box>
            <Box flex={1}>
                <Box p={4}>
                    <Text fontSize={{ base: 'sm', sm: 'md' }} fontWeight={'600'}>{name}</Text>
                    <Flex fontSize={'xs'} alignItems={'center'}>
                        <Text me={6} >Size {size}</Text>
                        <Text px={4}>{amount}</Text>
                    </Flex>
                    <Text fontSize={'xs'} fontWeight={'600'}>{<PriceTag price={price} />}</Text>
                </Box>
            </Box>
        </Box>
    )
}


const OrderItems = () => {

    const userId = localStorage.getItem('user')
    const [items, setItems] = useState([])
    const fetchData = async () => {
        try {

            const response = await axios.get(`http://localhost:4000/api/cart/${userId}`)
            setItems(response.data.cart.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchData()
        }

    }, [])

    return (
        <Box as={Flex} flexDir={'column'}>
            {items.map((item, index) => (
                <ShoesCard key={index} imgUrl={item.image} name={item.shoeName} size={item.size} price={item.price} />
            ))}
        </Box>
    )
}

export default OrderItems