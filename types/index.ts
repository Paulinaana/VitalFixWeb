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
    id: string;
    title: string;
    image: string;
    alt: string;
    redirect: string;
}

export interface ProductDetailProps{
    id: string;
    title: string;
    image: string;
    alt: string;
    description: string;

}