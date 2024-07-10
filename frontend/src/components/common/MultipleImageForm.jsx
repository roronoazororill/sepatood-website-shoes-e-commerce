import React, { useState } from 'react';
import { Button, Flex, Image, Input, Box, Text } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi'
const MultipleImageForm = ({ images, setImages }) => {
    const [imagePreviews, setImagePreviews] = useState([]);

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
    };

    return (
        <div>
            <Flex direction="column" align="center" justify="center" width="100%">
                <Flex wrap="wrap" justifyContent={'space-around'} h={'150px'} w={'full'} alignItems={'center'} mt="4">
                    {imagePreviews.map((preview, index) => (
                        <Flex key={index} direction="column" justifyContent={'center'} alignItems={'center'} m="2" position="relative">
                            <Image src={preview} alt={`Preview ${index}`} boxSize="100px" />
                            <Button onClick={() => removeImage(index)} variant={'ghost'} size="sm">
                                <FiTrash />
                            </Button>
                        </Flex>
                    ))}
                </Flex>
                <Box
                    as="label"
                    htmlFor="fileInput"
                    p="2"
                    cursor="pointer"
                    border="1px solid #ccc"
                    borderRadius="md"
                    _hover={{ borderColor: '#000' }}
                    w={'full'}
                >
                    <Text textAlign={'center'} fontSize={'sm'}>Choose Images</Text>
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

        </div>
    );
};

export default MultipleImageForm;