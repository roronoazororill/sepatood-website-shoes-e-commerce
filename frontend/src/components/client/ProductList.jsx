import {
    Box,
    Button,
    Flex,
    Image,
    Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonRed } from '../common/Buttons'
import ShoeData from '../../utils/shoeData'
import useImageFormatter from '../../hooks/useImageFormatter'
import PriceTag from '../common/PriceTag'

const ProductCard = ({ imgUrl, name, price, id }) => {
    const navigate = useNavigate()
    const handleDetail = () => {
        navigate('/product/' + id)
    }
    return (
        <Box bg={'vprimary'} p={4} as={Flex} flexDir={'column'} justifyContent={'space-between'} m={{ base: 3, sm: 4 }} boxSizing={'border-box'} maxW={{ base: 'calc(50% - 24px)', sm: 'calc(33% - 32px)', md: 'calc(25% - 32px)' }} cursor={'pointer'}  >
            <Box as={Flex} flex={1} justifyContent={'center'} alignItems={'center'} >
                <Image objectFit={'cover'} boxSizing={'border-box'} src={imgUrl} />
            </Box>
            <Box p={2} as={Flex} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                <Text textAlign={'center'} fontSize={{ base: '2xs', sm: 'xs', md: 'sm' }}>{name}</Text>
                <Text textAlign={'center'} fontSize={{ base: '2xs', sm: 'xs', md: 'sm' }} fontWeight={'600'}><PriceTag price={price} /></Text>
            </Box>
            <Box mt={{ base: 0, md: 4 }} onClick={handleDetail}>
                <ButtonRed font text={'detail'} />
            </Box>
        </Box>
    )
}


const ProductList = ({ data }) => {
    const { formatImage } = useImageFormatter()
    const [shoes, setShoes] = useState([])
    useEffect(() => {
        setShoes(data)
    }, [data])
    return (
        <Box>
            <Flex flexFlow={'row wrap'} px={{ base: 2, md: 8 }}  >
                {
                    shoes.map((shoe, index) => (
                        <ProductCard key={index} id={shoe._id} imgUrl={formatImage(shoe.images[0])} name={shoe.brand + ' ' + shoe.model} price={shoe.price} />
                    ))
                }
            </Flex>
        </Box>
    )
}

export default ProductList