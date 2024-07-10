import { Alert, AlertIcon } from '@chakra-ui/react'

export const AlertError = ({ message }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            {message}
        </Alert>
    )
}
export const AlertSuccess = ({ message }) => {
    return (
        <Alert status='success'>
            <AlertIcon />
            {message}
        </Alert>
    )
}