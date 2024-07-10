import { Stack, Box, Text, RadioGroup, Radio, Button, Flex, OrderedList, ListItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

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

const PaymentDetail = ({ name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <>
            <Button onClick={onOpen} size={'xs'} fontWeight={'400'} variant={'ghost'}>Detail</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Box p={2} borderBottom={'1px solid black'}>
                            <Text fontSize={'md'} fontWeight={'600'}>{name} Virtual Account</Text>
                        </Box>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p={2}>
                            <OrderedList fontSize={'xs'}>
                                <ListItem>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, repellat quis eum a laborum aperiam.
                                </ListItem>
                                <ListItem>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quidem vitae quae tempora debitis molestias ad, minus corrupti quibusdam consequuntur hic enim ipsa illo modi.
                                </ListItem>
                                <ListItem>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis et, possimus suscipit, quis reprehenderit ab reiciendis maiores repellendus doloremque hic placeat. Eligendi nostrum deserunt aliquam ex nulla ipsam quo quia consequuntur a, dolorem modi, impedit magnam. Labore sint sequi libero!
                                </ListItem>
                                <ListItem>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quisquam facilis nobis atque reiciendis id asperiores. Soluta illo non sequi aspernatur dolorem quod ratione fugit accusamus magni, repellat unde minus aliquid fuga optio magnam.
                                </ListItem>
                            </OrderedList>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const OrderPayment = () => {
    const [value, setValue] = useState('')
    return (
        <RadioGroup onChange={setValue} value={value}>
            <Stack gap={4}>
                <PaymentCard name={'Mandiri'} value={'1'} />
                <PaymentCard name={'BCA'} value={'2'} />
                <PaymentCard name={'BRI'} value={'3'} />
            </Stack>
        </RadioGroup>
    )
}

export default OrderPayment