import React, { useState } from 'react';
import { Input, Stack, Image, Button, Box } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
const MultipleImageUpload = () => {

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const imagePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({ src: event.target.result, alt: file.name });
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then((imageList) => {
                setImages([...images, ...imageList]);
            })
            .catch((error) => {
                console.error('Error uploading images: ', error);
            });
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <Box>
            <Stack direction="row" spacing={4} justifyContent={'center'} alignItems={'center'}>
                {images.map((image, index) => (
                    <div key={index}>
                        <Image src={image.src} alt={image.alt} boxSize="100px" />
                        <Button variant={'ghost'} w={'full'} onClick={() => handleRemoveImage(index)} size="sm">
                            <FiX />
                        </Button>
                    </div>
                ))}
            </Stack>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                mb={4}
            />

        </Box>
    );
};

export default MultipleImageUpload;