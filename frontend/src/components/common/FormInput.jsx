import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const FormInput = ({ label, type, value, ...rest }) => {
    return (
        <FormControl>
            <FormLabel fontSize={'xs'} textTransform={'uppercase'} fontWeight={'600'}>{label}</FormLabel>
            <Input {...rest} fontSize={'sm'} rounded={'none'} _focus={{ outline: 'none', boxShadow: 'none', border: '1px solid black' }} type={type} value={value} />
        </FormControl>
    )
}

export default FormInput