import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiTrash } from 'react-icons/fi'
import { ButtonDark, ButtonRed } from '../../components/common/Buttons'
import axios from 'axios'

const DeleteShoe = ({ id, brand, model }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()





    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/shoe/${id}`);
            console.log('Item deleted:', response.data);

        } catch (error) {
            console.error('Error deleting item:', error);
        }
        toast({
            title: 'Success',
            description: 'Shoe deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
        window.location.reload()
    }
    const handleCancel = () => {
        close()
    }
    return (
        <>
            <Button fontSize={'xl'} onClick={onOpen} variant={'ghost'}><FiTrash /></Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent p={6}>
                    <ModalHeader>Delete Shoe?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Are you sure to delete
                            <Text as={'span'} fontWeight={'500'}> {brand + ' ' + model + '?'}</Text>
                        </Text>

                    </ModalBody>

                    <ModalFooter mt={8} as={Flex} justifyContent={'space-between'}>
                        <Box onClick={handleCancel}>
                            <ButtonDark text={'cancel'} />

                        </Box>
                        <Box onClick={handleDelete}>

                            <ButtonRed text={'yes'} />
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteShoe