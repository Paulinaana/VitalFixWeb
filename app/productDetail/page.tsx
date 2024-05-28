'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomProductDetail from '@/components/CustomProductDetail';

function ProductDetail() {
    const searchParams = useSearchParams();
    const product_id = searchParams.get('id');
    console.log("eeee", product_id)
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
              console.error('No token found');
              return;
            }
            try {
                const response = await axios.get(`https://back-vitalfix.onrender.com/api/v1/equips/${product_id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (product_id) {
            fetchProductDetails();
        }
    }, [product_id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CustomProductDetail
                id = {product.id}
                title={product.name}
                image={product.urlImagen || '/ultrasonido.jpg'}
                alt={product.name}
                description={product.description}
            />
        </div>
    );
}

export default ProductDetail;
