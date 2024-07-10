import React from 'react';

const PriceTag = ({ price }) => {

    const formattedPrice = price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <span>
            {formattedPrice}
        </span>
    );
};

export default PriceTag;