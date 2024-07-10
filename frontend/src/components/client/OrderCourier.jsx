import { Box, Stack, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import PriceTag from "../common/PriceTag"

const MethodCard = ({ name, price, estimate, description, handleClick, data, id, isActive }) => {
    const today = new Date();
    const calculateDate = (days) => {
        const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        return futureDate.toDateString();
    };

    return (
        <Box id={id} onClick={() => handleClick(data, id)}

            cursor={'pointer'} p={4} borderBottom={'1px solid black'}>
            <Text color={isActive ? 'vsecondary' : 'vdark'} fontSize={'sm'} fontWeight={'600'}>{name}</Text>
            <Text fontSize={'xs'} fontWeight={'400'}>{description}</Text>
            <Text fontSize={'xs'} fontWeight={'400'}>{<PriceTag price={price} />}  <Text fontSize={'xs'} as='span'>&#40;{today.toDateString() + ' - ' + calculateDate(estimate)}&#41;</Text></Text>
        </Box>
    )
}

const OrderCourier = ({ setOrderDelivery }) => {
    const [methods, setMethods] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/delivery/')
            setMethods(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [isActive, setActive] = useState(null)
    const toggleActive = (id) => {
        setActive(isActive === id ? null : id)
    }

    const handleClick = (data, id) => {
        setOrderDelivery(data)
        toggleActive(id)
    }
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <Stack gap={4}>
            {methods.map((method, index) => (
                <MethodCard id={index + 1} isActive={isActive == index + 1} handleClick={handleClick} key={index} name={method.name} price={method.cost} data={method} estimate={method.estimatedDeliveryTime} description={method.description} />
            ))}
        </Stack>
    )
}

export default OrderCourier