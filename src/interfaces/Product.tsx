export interface Product {
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
export interface AddProduct {
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    category: string;
    description: string;
    image: File | null;
}

export interface UpdateProduct {
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