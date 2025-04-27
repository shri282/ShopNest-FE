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