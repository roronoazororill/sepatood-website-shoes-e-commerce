import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Header = ({ text, colorx, ...rest }) => {
    return (
        <Flex
            mb={12}
            justifyContent={'start'}
            alignItems={'center'}
            _before={{
                content: '""',
                borderBottom: '1px solid',
                borderColor: 'red',
                flexGrow: 1,
                mr: 8,
            }}
            _after={{
                content: '""',
                borderBottom: '1px solid',
                borderColor: 'red',
                flexGrow: 1,
                ml: 8,
            }}
        >
            <Heading  {...rest} fontSize={{ base: '4xl', md: '5xl' }} fontWeight={'extrabold'} m={0} textTransform={'uppercase'}>{text}</Heading>
        </Flex>
    )
}

export default Header