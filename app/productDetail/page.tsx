import Image from 'next/image';
import React from 'react';

import { ProductDetailProps } from "@/types";
import CustomProductDetail from '@/components/CustomProductDetail'; // Import corrected

function productDetail({
    searchParams,
}: {
    searchParams: {
        title: string;
        category: string;
        image: string;
        alt: string;
        description: string;
        price: string;
    };
}) {
    const { title, category, image, alt, description, price } = searchParams; // Destructure the props

    return (
        <div>
            <CustomProductDetail
                title={title}
                category={category}
                image={image}
                alt={alt}
                description={description}
                price={price}
            />
        </div>
    );
}

export default productDetail;