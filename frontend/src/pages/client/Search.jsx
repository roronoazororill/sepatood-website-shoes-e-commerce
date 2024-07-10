import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import ProductList from '../../components/client/ProductList'
import Header from '../../components/common/Header'
import Navbar from '../../components/client/Navbar'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import useGetData from '../../hooks/useGetData'

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [shoes, setShoes] = useState([]);
    const apiUrl = 'http://localhost:4000/api/shoe/search';

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}?q=${searchQuery}`);
            const data = await response.json();
            setShoes(data);
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        const inputValue = e.target.value;
        setSearchQuery(inputValue);
        setSearchParams({ q: inputValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    console.log(searchQuery)
    return (
        <Box as={Flex} direction={'column'} minH={'100vh'}>
            <Navbar />
            <Box flex={1} bg={'vprimary'} as={Flex} alignItems={'center'} flexDirection={'column'} >
                <Header pt={'2rem'} color={'vsecondary'} text={'Search shoes'} />
                <Box minW={{ base: '300px', sm: '2xl', md: '3xl' }} as='form'  >
                    <InputGroup onSubmit={handleSubmit}  >
                        <Input value={searchQuery} onChange={handleInputChange} border={'2px solid black'} fontSize={'sm'} placeholder={'Search product here...'} focusBorderColor={'2px solid black'} rounded={'none'} _focus={{ outline: 'none', boxShadow: 'none', }} />
                    </InputGroup>
                </Box>
                <Box flex={1} w={'full'} mt={'4rem'} p={{ base: 2, md: 16 }} bg={'vdark'}>
                    {shoes.length ? <ProductList data={shoes} /> : <Heading textAlign={'center'} textTransform={'uppercase'} color={'vlight'}>No matching shoes found</Heading>}
                </Box>
            </Box>
        </Box>
    )
}

export default Search