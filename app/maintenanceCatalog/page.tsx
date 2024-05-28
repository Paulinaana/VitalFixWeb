'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomButton, CustomFilter, SearchBar, ProductCard } from '@/components';


function catalog(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
              console.error('No token found');
              return;
            }
            try {
                const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/equips', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='w-full min-h-screen flex items-start pt-36 pb-10 bg-gray-100'>
            <div className='mt-12 padding-x padding-y max-width' id="discover">
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Servicio de Mantenimiento</h1>
                    <div className='home__filters'>
                        <SearchBar />
                        <div className='flex flex-row'>
                            <input type='text' placeholder='Escribe ' className='w-80 border-r-2' />
                            <CustomButton
                                title='Buscar'
                                containerStyles='w-full py-[16px] rounded-full bg-primary-blue text-white'
                            />
                        </div>
                    </div>
                    <section>
                        <div className='home__cars-wrapper'>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    image={product.urlImagen || '/ultrasonido.jpg'}
                                    alt={product.name}
                                    redirect='/productDetail'
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default catalog
