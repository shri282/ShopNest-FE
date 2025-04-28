export interface IProduct {
    id: number;
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    category: string;
    description: string;
    updatetedAt: Date;
    createdAt: Date;
    image: String;
    imageType: String;
    imageName: String;
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
}

export interface IProductFilter {
    name: string;
    brand: string;
    category: string;
}