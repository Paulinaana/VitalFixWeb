import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface ProductCardProps{
    title: string;
    image: string;
    alt: string;
    redirect: string;
}

export interface ProductDetailProps{
    title: string;
    category: string;
    image: string;
    alt: string;
    description: string;
    price: string;

}