import { Box, Flex, FormLabel, Heading, Image, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../../components/admin/FormInput'
import { ButtonDark, ButtonRed } from '../../components/common/Buttons'
import { useNavigate, useParams } from 'react-router-dom'
import ImageSlider from '../../components/admin/ImageSlider'
import axios from 'axios'
const ShoeDetails = () => {


    const { id } = useParams()
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('')
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchShoeData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/shoe/id/${id}`);
                setBrand(response.data.brand);
                setModel(response.data.model);
                setSize(response.data.size);
                setCondition(response.data.condition);
                setColor(response.data.color);
                setPrice(response.data.price);
                setAvailability(response.data.availability);
                setDescription(response.data.description);
                setImages(response.data.images)

                console.log(response.data.images)
            } catch (error) {
                console.error('Error fetching shoe data:', error);
            }
        };
        fetchShoeData();
    }, [id])

    const handleCancel = () => {
        navigate('/admin')
    }


    return (
        <Box maxW={'5xl'} m={'auto'} p={16}>
            <Box bg={'vlight'} p={16}>
                <Box >
                    <ImageSlider images={images} />
                </Box>
                <Box mt={8}>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Brand
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {brand}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                model
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {model}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                size
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {size}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                condition
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {condition}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                color
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {color}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                price
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {price}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                availability
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {availability}
                            </Text>
                        </Box>
                    </Flex>
                    <Box mt={12}>
                        <Box>
                            <Heading textAlign={'center'} size='xs' textTransform='uppercase'>
                                description
                            </Heading>
                            <Text pt='2' fontSize='sm' minH={12}>
                                {description}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={4} onClick={handleCancel} w={'full'}>
                <ButtonRed text={'back'} type={'button'} />
            </Box>
        </Box>
    )
}

export default ShoeDetails