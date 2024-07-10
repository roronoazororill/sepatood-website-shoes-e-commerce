import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'
import OrderItems from './OrderItems'
import OrderAddresses from './OrderAddresses'
import OrderCourier from './OrderCourier'
import OrderPayment from './OrderPayment'

const DetailItem = ({ title, children, ...rest }) => {
    return (
        <AccordionItem>
            <AccordionButton>
                <Box as="span" flex='1' textAlign='left' fontSize={'md'} fontWeight={'600'}>
                    {title}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                {children}
            </AccordionPanel>
        </AccordionItem>
    )
}


const OrderDetails = ({ setOrderDelivery, setOrderAddress }) => {
    return (
        <Box>
            <Accordion defaultIndex={[0]} allowMultiple>
                <DetailItem title={'Items List'} children={<OrderItems />} />
                <DetailItem title={'Order Address'} children={<OrderAddresses setOrderAddress={setOrderAddress} />} />
                <DetailItem title={'Delivery Method'} children={<OrderCourier setOrderDelivery={setOrderDelivery} />} />
            </Accordion>
        </Box>
    )
}

export default OrderDetails