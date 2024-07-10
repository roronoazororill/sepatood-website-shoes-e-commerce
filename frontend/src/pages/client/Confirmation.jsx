import { Box, Button, Flex } from "@chakra-ui/react"
import Navbar from "../../components/client/Navbar"
import OrderDetails from "../../components/client/OrderDetails"
import { ButtonDark } from "../../components/common/Buttons"

const ShoesCard = ({ imgUrl, name, size, amount, harga }) => {
    return (
        <Box as={Flex} borderBottom={'1px solid gray'}>
            <Box maxH={'100px'} aspectRatio={'1 / 1'}>
                <Image boxSizing={'border-box'} src={imgUrl} />
            </Box>
            <Box flex={1}>
                <Box p={4}>
                    <Text fontSize={{ base: 'sm', sm: 'md' }} fontWeight={'600'}>{name}</Text>
                    <Flex fontSize={'xs'} alignItems={'center'}>
                        <Text me={6} >Size {size}</Text>
                        <Text px={4}>{amount}</Text>
                    </Flex>
                    <Text fontSize={'xs'} fontWeight={'600'}>IDR {harga}</Text>
                </Box>
            </Box>
        </Box>
    )
}

const AddressCard = ({ isActive, toggleActive, id }) => {
    return (
        <Box id={id} onClick={() => toggleActive(id)} p={1} cursor={'pointer'} >
            <Box mb={4}>
                <Text fontSize={'md'} color={isActive ? 'vsecondary' : 'vdark'} fontWeight={'600'}>Rumah Saya</Text>
            </Box>
            <Box as={Stack} fontSize={{ base: 'xs', sm: 'sm' }} gap={2}>
                <Text >Joko</Text>
                <Text >1212, Denpasar Utara, Denpasar, Bali</Text>
                <Text>
                    Jalan nangka nomor 12, pagar hijau
                </Text>
            </Box>
        </Box>
    )
}

const MethodCard = ({ name, price, estimate }) => {
    return (
        <Box cursor={'pointer'} p={4} borderBottom={'1px solid black'}>
            <Text fontSize={'sm'} fontWeight={'600'}>{name} <Text fontSize={'xs'} as='span'>&#40;{price}&#41;</Text></Text>

        </Box>
    )
}

const PaymentCard = ({ name, value }) => {
    return (
        <Box cursor={'pointer'} p={4} borderBottom={'1px solid black'} as={Flex} justifyContent={'space-between'}>
            <Radio value={value} w={'full'}>
                <Text fontSize={'sm'} fontWeight={'600'}>{name} Virtual Account</Text>
            </Radio>
            <PaymentDetail name={name} />
        </Box>
    )
}


const Confirmation = () => {
    return (
        <Box as={Flex} direction={'column'} bg={'vprimary'} minH={'100vh'} >
            <Navbar />
            <Box flex={1} as={Flex} px={8} gap={32} justifyContent={'center'}>
                <Box minW={'50%'} p={6} bg={'vlight'} >

                    <Box mt={6}>
                        <ButtonDark text={'Pilih Pembayaran'} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Confirmation