

const useFormatPrice = ({ price }) => {
    const formattedPrice = price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return formattedPrice
}

export default useFormatPrice
