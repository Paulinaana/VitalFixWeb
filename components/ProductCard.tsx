'use client';

import { ProductCardProps } from "@/types";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

function ProductCard({ id, title, image, alt, redirect }: ProductCardProps) {
    const router = useRouter();

    const handleViewMore = () => {
        router.push(`${redirect}?id=${id}`);
    };

    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">{title}</h2>
            </div>
            <div className="relative w-full h-40 my-3 object-contain">
                <Image
                    src={image}
                    alt={alt}
                    fill
                    priority
                    className="object-contain"
                />
            </div>
            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-grey">
                    <div className="flex flex-col justify-center items-center gap-2 mb-12">
                        <p className="text-[14px] leading-[17px]">Detalles y revisión</p>
                    </div>
                    <div className="car-card__icon"></div>
                    <div className="car-card__icon"></div>
                </div>
                <div className="car-card__btn-container">
                    <button
                        className="w-full py-[16px] rounded-full bg-primary-blue text-white pl-10 mt-10"
                        onClick={handleViewMore}
                    >
                        Ver más
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
