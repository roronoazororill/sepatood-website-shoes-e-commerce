import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Select, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../../components/admin/FormInput'
import { ButtonDark, ButtonRed } from '../../components/common/Buttons'
import MultipleImageUpload from '../../components/admin/MultipleImageUpload'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import MultipleImageForm from '../../components/common/MultipleImageForm'
import { FiTrash } from 'react-icons/fi'

const EdiShoeForm = () => {

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
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        const fetchShoeData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/shoe/id/${id}`); // Replace with your API endpoint
                setBrand(response.data.brand);
                setModel(response.data.model);
                setSize(response.data.size);
                setCondition(response.data.condition);
                setColor(response.data.color);
                setPrice(response.data.price);
                setAvailability(response.data.availability);
                setDescription(response.data.description);
                setSelectedImages(response.data.images)

            } catch (error) {
                console.error('Error fetching shoe data:', error);
            }
        };
        fetchShoeData();
    }, [id])

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        const newImages = Array.from(selectedFiles);
        setImages([...images, ...newImages]);

        const previews = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
        setSelectedImages(updatedImages)

    };


    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('size', Number(size));
            formData.append('condition', condition)
            formData.append('color', color)
            formData.append('price', Number(price))
            formData.append('availability', availability)
            formData.append('description', description)

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);

            }

            await axios.put(`http://localhost:4000/api/shoe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Shoe updated successfully!');
            navigate('/admin')
        } catch (error) {
            console.error('Error updating shoe:', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin')
    }

    const formatImage = (url) => {
        return url.replace('..\\frontend\\public', '').replace(/\\/g, '/')
    }
    return (
        <Box as='form' onSubmit={handleSubmit} maxW={'5xl'} bg={'vlight'} m={'auto'} p={16}>
            <Flex justifyContent={'space-between'}>
                <Stack justifyContent={'space-between'} gap={6}>
                    <Box>
                        <FormLabel fontSize={'xs'} textTransform={'uppercase'} fontWeight={'600'}>Images</FormLabel>
                        <Box>
                            <Flex direction="column">
                                <Flex justifyContent={'center'} gap={4} h={'150px'}>
                                    {imagePreviews.length > 0 ?
                                        imagePreviews.map((preview, index) => (
                                            <Flex key={index} direction="column" align="center" m="2">
                                                <Image src={preview} alt={`Preview ${index}`} boxSize="100px" />
                                                <Button variant={'ghost'} onClick={() => removeImage(index)} size="md">
                                                    <FiTrash />
                                                </Button>
                                            </Flex>

                                        )) :
                                        selectedImages.map((preview, index) => (
                                            <Flex key={index} direction="column" align="center" m="2">
                                                <Image src={formatImage(preview)} boxSize="100px" />
                                                <Button variant={'ghost'} onClick={() => removeImage(index)} size="md">
                                                    <FiTrash />
                                                </Button>
                                            </Flex>

                                        ))

                                    }
                                </Flex>
                                <Box
                                    as="label"
                                    htmlFor="fileInput"
                                    p="2"
                                    cursor="pointer"
                                    border="1px solid #ccc"
                                    borderRadius="none"
                                    _hover={{ borderColor: '#000' }}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                >
                                    <Text textAlign={'center'}>choose images</Text>
                                    <Input
                                        id="fileInput"
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        opacity="0"
                                        position="absolute"
                                        zIndex="-1"
                                    />
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                    <Flex gap={6}>
                        <FormInput value={brand} onChange={(e) => setBrand(e.target.value)} label={'Brand'} type={'text'} />
                        <FormInput value={model} onChange={(e) => setModel(e.target.value)} label={'Model'} type={'text'} />
                    </Flex>
                </Stack>
                <Stack justifyContent={'space-between'} gap={6}>
                    <Flex gap={6}>
                        <FormInput value={color} onChange={(e) => setColor(e.target.value)} label={'Color'} type={'text'} />
                        <FormInput value={price} onChange={(e) => setPrice(e.target.value)} label={'Price'} type={'number'} />
                    </Flex>
                    <Flex gap={6}>
                        <FormInput value={size} onChange={(e) => setSize(e.target.value)} label={'Size'} type={'number'} />
                        <FormControl>
                            <FormLabel fontSize={'xs'} textTransform={'uppercase'} fontWeight={'600'}>Condition</FormLabel>
                            <Select value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Select option">
                                <option value="New">New</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    <Flex gap={6}>
                        <FormControl>
                            <FormLabel fontSize={'xs'} textTransform={'uppercase'} fontWeight={'600'}>Availability</FormLabel>
                            <Select value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Select option">
                                <option value="In stock">In stock</option>
                                <option value="Sold out">Sold out</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    < Box >
                        <FormLabel fontSize={'xs'} textTransform={'uppercase'} fontWeight={'600'}>Description</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            h={12}
                            placeholder='Add description'
                            size='sm'
                        />
                    </ Box>
                </Stack >
            </Flex >
            <Flex mt={16} justifyContent={'space-between'}>
                <Box onClick={handleCancel} w={'16rem'}>
                    <ButtonDark text={'cancel'} type={'button'} />
                </Box>
                <Box w={'16rem'}>
                    <ButtonRed text={'save'} type={'submit'} />
                </Box>
            </Flex>
        </Box >
    )
}

export default EdiShoeForm