import React, { useState } from 'react';
import { Box, Image, Button, Flex } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const ImageSlider = ({ images }) => {
    if (images.length <= 0) {
        return
    }
    console.log(images)

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPrevious = () => {
        const newIndex = (currentImageIndex - 1 + images.length) % images.length;
        setCurrentImageIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
    };

    const formatImage = (url) => {
        return url.replace('..\\frontend\\public', '').replace(/\\/g, '/')
    }
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <Box as={Flex} justifyContent={'center'} position="relative" w={'full'}>
                <Image h={'300px'} src={formatImage(images[currentImageIndex])} alt={`Image ${currentImageIndex + 1}`} />
                <Flex justifyContent="space-between" position="absolute" width="100%" top="50%" transform="translateY(-50%)">
                    <Button variant={'ghost'} onClick={goToPrevious} size="sm">
                        <FiArrowLeft />
                    </Button>
                    <Button variant={'ghost'} onClick={goToNext} size="sm">
                        <FiArrowRight />
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ImageSlider;