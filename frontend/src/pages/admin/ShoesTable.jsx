import { Table, Thead, Tbody, Tr, Th, Td, Image, Stack, IconButton, Button } from '@chakra-ui/react';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import DeleteShoe from './DeleteShoe';
import useImageFormatter from '../../hooks/useImageFormatter';
import useFormatPrice from '../../hooks/useFormatPrice';
import PriceTag from '../../components/common/PriceTag';
import { useEffect, useState } from 'react';

const ActionButtons = ({ id, shoe }) => {
    const navigate = useNavigate()
    return (
        <Stack >
            <IconButton fontSize={'xl'} onClick={() => navigate(`/admin/edit/${id}`)} variant={'ghost'} _hover={{ backgroundColor: 'none' }}><FiEdit /></IconButton>
            <IconButton fontSize={'xl'} onClick={() => navigate(`/admin/detail/${id}`)} variant={'ghost'} _hover={{ backgroundColor: 'none' }}><FiEye /></IconButton>
            <DeleteShoe id={id} brand={shoe.brand} model={shoe.model} />
        </Stack>
    )
}
const ShoesTable = ({ data }) => {
    if (data.length <= 0) {
        return
    }

    const formatImage = (url) => {
        return url.replace('..\\frontend\\public', '').replace(/\\/g, '/')
    }

    const [sortedData, setSortedData] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {

        if (sortedData.length < 1) {
            setSortedData([...data]);
        }
        console.log(sortedData)

    }, [data, sortDirection]);

    const handleSort = () => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(direction);
        const clonedData = [...sortedData];

        clonedData.sort((a, b) => {
            if (direction === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setSortedData(clonedData);
    };

    return (
        <Table  >
            <Thead>
                <Tr bg={'vdark'} >
                    <Th color={'vprimary'}>no</Th>
                    <Th color={'vprimary'}>image</Th>
                    <Th color={'vprimary'}>brand</Th>
                    <Th color={'vprimary'}>model</Th>
                    <Th color={'vprimary'}>size</Th>
                    <Th color={'vprimary'}>condition</Th>
                    <Th color={'vprimary'}>color</Th>
                    <Th color={'vprimary'}> Price{' '}
                        <Button p={0} color={'white'} variant={'ghost'} size={'xs'} onClick={handleSort}>
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </Button></Th>
                    <Th color={'vprimary'}>availability</Th>
                    <Th color={'vprimary'}>action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedData.length > 0 && sortedData.map((shoe, index) => (
                    <Tr key={index} bg={index % 2 === 0 ? "vlight" : "vprimary"} >
                        <Td>{index + 1}</Td>
                        <Td>
                            <Image boxSize={'200px'} alt={`${shoe.brand} ${shoe.model}`} src={shoe.images.length > 0 ? formatImage(shoe.images[0]) : ''} />
                        </Td>
                        <Td>{shoe.brand}</Td>
                        <Td>{shoe.model}</Td>
                        <Td>{shoe.size}</Td>
                        <Td>{shoe.condition}</Td>
                        <Td>{shoe.color}</Td>
                        <Td>{<PriceTag price={shoe.price} />}</Td>
                        <Td>{shoe.availability}</Td>
                        <Td>
                            <ActionButtons id={shoe._id} shoe={shoe} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default ShoesTable;