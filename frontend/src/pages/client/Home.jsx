import { Box, Flex, Select } from '@chakra-ui/react'
import Navbar from '../../components/client/Navbar'
import ProductList from '../../components/client/ProductList'
import ShoeFilter from '../../components/client/ShoeFilter'
import Header from '../../components/common/Header'
import useGetData from '../../hooks/useGetData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '../../components/client/Carousel'
import FeaturedImage from '../../components/client/FeaturedImage'

const Home = () => {
    const { data, loading, error } = useGetData('http://localhost:4000/api/shoe/')

    const [shoes, setShoes] = useState([])
    const getShoes = async () => {
        const response = await axios.get('http://localhost:4000/api/shoe/')
        setShoes(response.data)
    }

    const [filteredShoes, setFilteredShoes] = useState([])


    useEffect(() => {
        getShoes()
        console.log(shoes)
    }, [data])

    const shortHighToLow = () => {
        const sortedShoes = [...shoes].sort((a, b) => b.price - a.price);
        setShoes(sortedShoes);

    }

    const sortLowToHigh = () => {
        const sortedShoes = [...shoes].sort((a, b) => a.price - b.price);
        setShoes(sortedShoes);

    };

    const filterByBrand = (selectedBrand) => {
        const filteredShoes = shoes.filter(shoe => shoe.brand === selectedBrand);
        setFilteredShoes(filteredShoes)
    };

    const filterBySize = (selectedSize) => {
        const filteredShoes = shoes.filter(shoe => shoe.size === Number(selectedSize));
        setFilteredShoes(filteredShoes)
    };

    const filterByCondition = (selectedCondition) => {
        const filteredShoes = shoes.filter(shoe => shoe.condition === selectedCondition);
        setFilteredShoes(filteredShoes)
    };

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'highToLow') {
            shortHighToLow();
        } else if (selectedValue === 'lowToHigh') {
            sortLowToHigh();
        }
    };

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;

        if (selectedBrand === 'all') {
            setFilteredShoes([])
        } else {
            filterByBrand(selectedBrand);
        }
    };
    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;

        if (selectedSize === 'all') {
            setFilteredShoes([])
        } else {
            filterBySize(selectedSize);
        }
    };
    const handleConditionChange = (event) => {
        const selectedCondition = event.target.value;

        if (selectedCondition === 'all') {
            setFilteredShoes([])
        } else {
            filterByCondition(selectedCondition);
        }
    };

    return (
        <Box as={Flex} direction={'column'} w={'full'} minH={'100vh'}>
            <Navbar />
            <Box flex={1} bg={'red'}>
                <Flex bg={'red'}>
                    <Box bg={'vprimary'} w={'full'}>
                        <Box bg={'vdark'}>
                            <FeaturedImage />
                        </Box>
                        <Carousel data={shoes} />
                        <Box p={{ base: 2, md: 16 }} bg={'vdark'}>
                            <Header p={{ base: 2, md: 16 }} colorx={'white'} color={'vprimary'} text={'our shoes'} />
                            <Box p={4}>
                                <ShoeFilter handleSizeChange={handleSizeChange} handleConditionChange={handleConditionChange} handleBrandChange={handleBrandChange} handleSortChange={handleSortChange} />
                            </Box>
                            <ProductList data={filteredShoes.length > 0 ? filteredShoes : shoes} />
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Home