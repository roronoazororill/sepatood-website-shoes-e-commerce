import { Box, Button, Flex, FormLabel, Image, Text, useToast } from "@chakra-ui/react"
import SizeCard from "./SizeCard"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import DetailsCard from "./DetailsCard";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDark, ButtonRed } from "../common/Buttons";
import useGetData from "../../hooks/useGetData";
import { useEffect, useState } from "react";
import useImageFormatter from "../../hooks/useImageFormatter";
import axios from "axios";

const CustomPrevArrow = (props) => {
    const { onClick, ...rest } = props;
    return (
        <Button onClick={onClick} variant={'ghost'} {...rest} position={'absolute'} left={0} top={'50%'} zIndex={4}>
            <FiArrowLeft />
        </Button>
    );
};

const CustomNextArrow = (props) => {
    const { onClick, ...rest } = props;
    return (
        <Button onClick={onClick} variant={'ghost'} {...rest} position={'absolute'} right={0} top={'50%'} zIndex={4}>
            <FiArrowRight />
        </Button>
    );
};



const ImageCarousel = ({ shoeImages }) => {
    const { formatImage } = useImageFormatter()
    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            showArrows={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && <CustomPrevArrow onClick={onClickHandler} />
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && <CustomNextArrow onClick={onClickHandler} />
            }
        >
            {shoeImages && shoeImages.map((img, index) => (
                <div key={index}>
                    <Box px={12} w={'full'} m={'auto'} >
                        <img
                            src={formatImage(img)}
                            alt={`Shoe ${index + 1}`}
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </div>
            ))}
        </Carousel>
    )
}

const ProductDetail = () => {

    const { id } = useParams()
    const { data, loading, error } = useGetData(`http://localhost:4000/api/shoe/id/${id}`)

    const toast = useToast()

    const [shoe, setShoe] = useState(null)
    const [shoeImages, setShoeImages] = useState([])
    const [description, setDescription] = useState('')


    const userId = localStorage.getItem('user')
    const [shoeName, setShoeName] = useState('')
    const [price, setPrice] = useState('')
    const [shoeId, setShoeId] = useState('')
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        if (data) {
            setShoe(data)
            setShoeImages(data.images)
            setDescription(data.description)
            setShoeName(data.brand + ' ' + data.model)
            setPrice(data.price)
            setShoeId(data._id)
            setImage(formatImage(data.images[0]))
            setSize(data.size)

        }
    }, [data])

    const { formatImage } = useImageFormatter()
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/shop')
    }

    const handleAddToCart = async () => {
        if (!userId) {
            toast({
                title: 'Error',
                description: 'Please login first',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            setTimeout(() => {
                navigate('/login')
            }, 2000)
            return

        }

        try {
            const response = await axios.post(`http://localhost:4000/api/cart/`, { userId, shoeId, shoeName, price, image, size })
            console.log(response)
            toast({
                title: 'Success',
                description: 'Shoe added to shopping cart',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Shoe has been added to shopping cart',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            console.log(err)
        }

    }
    return (
        <>
            <Box bg={'vprimary'} minH={'100vh'} as={Flex} flexDirection={{ base: 'column', md: 'row' }} px={{ base: 2, md: 32 }}>
                <Box display={{ base: 'block', md: 'none' }} >
                    <ImageCarousel shoeImages={shoeImages} />
                </Box>
                <Box display={{ base: 'none', md: 'block' }} flex={'1.8'} as={Flex} direction={'column'}>

                    {shoeImages ? shoeImages.map((img, index) => ((
                        <Box key={index} px={12} w={'full'} m={'auto'} >
                            <Image objectFit={'cover'} w={'full'} boxSizing={'border-box'} src={formatImage(img)} />
                        </Box>
                    ))) : null}
                    <Box mx={12} mt={8} onClick={handleBack} mb={20} display={{ base: 'none', md: 'block' }} >
                        <ButtonDark text={'Back'} />
                    </Box>
                </Box>
                <Box flex={1} bg={'vlight'} px={12}>
                    <Box position={'sticky'} top={{ base: 'calc(25% - 64px)', lg: 'calc(35% - 64px)' }}>
                        <DetailsCard data={shoe} />
                        <Box px={6} mt={4} display={{ base: 'block' }} >
                            <Text fontSize={'sm'} textTransform={'uppercase'} fontWeight={'600'}>description</Text>
                            <Text fontSize={'md'}>{description}</Text>
                        </Box>
                        <Box onClick={handleAddToCart} mt={4} display={{ base: 'none', md: 'block' }} >
                            <ButtonRed text={'Add to Cart'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={8} py={4} px={8} position={'sticky'} bottom={0} display={{ base: 'block', md: 'none' }} >
                <Button onClick={handleAddToCart} bg={'vdark'} color={'vlight'} w={'full'} size={'sm'} py={6} fontWeight={'400'}>Add to Cart</Button>
            </Box>

        </>

    )
}

export default ProductDetail