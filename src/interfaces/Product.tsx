export interface IProduct {
    id: number;
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    category: string;
    description: string;
    imageType: String;
    imageName: String;
    imageURL: string;
}
export interface IAddProduct {
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    category: string;
    description: string;
    image: File | null;
}

export interface IUpdateProduct {
    id: number;
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    category: string;
    description: string;
    image: File | null;
    imageURL: string;
}

export interface IProductFilter {
    name: string;
    brand: string;
    category: string;
}