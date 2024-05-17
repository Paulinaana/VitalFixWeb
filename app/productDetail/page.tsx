import Image from 'next/image'
import React from 'react'

import { ProductDetailProps } from "@/types";

import { CustomProductDetail } from '@/components';


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
    return (
        <div>
            <CustomProductDetail {searchParams} />
        </div>
    );
}

export default productDetail