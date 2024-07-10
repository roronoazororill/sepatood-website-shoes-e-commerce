import {
    Badge, Box, Flex, Image, Stack, Text,
    Table, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react"

const transactions = [
    {
        id_transaksi: 1,
        brand: 'Converse',
        model: 'CDG Multi Hearts High',
        jumlah: 1,
        total_harga: '1.300.000',
        tanggal: '2023-12-12',
        status: 'Selesai',
    },
];

const TransactionTable = ({ transactions }) => {
    return (
        <Table >
            <Thead>
                <Tr bg={'vdark'}>
                    <Th color={'vprimary'}>ID Transaksi</Th>
                    <Th color={'vprimary'}>Brand</Th>
                    <Th color={'vprimary'}>Model</Th>
                    <Th color={'vprimary'}>Jumlah</Th>
                    <Th color={'vprimary'}>Total Harga</Th>
                    <Th color={'vprimary'}>Tanggal</Th>
                    <Th color={'vprimary'}>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {transactions.map((transaction, index) => (
                    <Tr key={transaction.id_transaksi} bg={index % 2 === 0 ? "vlight" : "vprimary"}>
                        <Td>{transaction.id_transaksi}</Td>
                        <Td>{transaction.brand}</Td>
                        <Td>{transaction.model}</Td>
                        <Td>{transaction.jumlah}</Td>
                        <Td>{transaction.total_harga}</Td>
                        <Td>{transaction.tanggal}</Td>
                        <Td>{transaction.status}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}



const UserOrders = () => {
    return (
        <Box>
            <Stack gap={4}>
                <TransactionTable transactions={transactions} />
            </Stack>
        </Box>
    )
}

export default UserOrders