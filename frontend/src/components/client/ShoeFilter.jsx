import { Flex, Select } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShoeFilter = ({ handleSortChange, handleBrandChange, handleSizeChange, handleConditionChange }) => {
    const [shoes, setShoes] = useState([])

    const getShoes = async () => {
        const response = await axios.get('http://localhost:4000/api/shoe/')
        setShoes(response.data)
    }

    useEffect(() => {
        getShoes()
    }, [])

    const brands = Array.from(new Set(shoes.map(shoe => shoe.brand)))
    const sizes = Array.from(new Set(shoes.map(shoe => shoe.size)))
    const conditions = Array.from(new Set(shoes.map(shoe => shoe.condition)))

    return (
        <Flex gap={{ base: 2, sm: 0 }} flexFlow={'row wrap'} justifyContent={'space-between'} mx={{ base: 0, sm: 4, md: 8 }}  >
            <Select maxW={{ sm: 'calc(50% - 24px)', md: 'calc(25% - 32px)' }} fontSize={{ base: 'xs', md: 'md' }} size={'lg'} borderRadius={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: '1px solid black' }} bg={'vprimary'} onChange={handleSortChange} defaultValue="" placeholder='Sort by Price'>
                <option value="highToLow">High to Low</option>
                <option value="lowToHigh">Low to High</option>
            </Select>
            <Select maxW={{ sm: 'calc(50% - 32px)', md: 'calc(25% - 32px)' }} fontSize={{ base: 'xs', md: 'md' }} size={'lg'} borderRadius={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: '1px solid black' }} bg={'vprimary'} onChange={handleBrandChange} defaultValue="all" placeholder='Brand'>
                {brands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                ))}
            </Select>
            <Select maxW={{ sm: 'calc(50% - 32px)', md: 'calc(25% - 32px)' }} fontSize={{ base: 'xs', md: 'md' }} size={'lg'} borderRadius={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: '1px solid black' }} bg={'vprimary'} onChange={handleSizeChange} defaultValue="all" placeholder='Size'>
                {sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </Select>
            <Select maxW={{ sm: 'calc(50% - 64px)', md: 'calc(25% - 64px)' }} fontSize={{ base: 'xs', md: 'md' }} size={'lg'} borderRadius={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: '1px solid black' }} bg={'vprimary'} onChange={handleConditionChange} defaultValue="all" placeholder='Condition'>
                {conditions.map((condition, index) => (
                    <option key={index} value={condition}>{condition}</option>
                ))}
            </Select>
        </Flex>
    )
}

export default ShoeFilter