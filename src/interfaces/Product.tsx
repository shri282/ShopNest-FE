import { User } from "./User";

export interface IProduct {
    id: number;
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    categoryId: number;
    categoryName: string;
    description: string;
    imageType: String;
    imageName: String;
    imageURL: string;
}

export interface IProductCategory {
    id: number;
    name: string;
    slug: string;
    parentId: number;
    level: number;
    isLeaf: boolean;
    isActive: boolean;
    displayOrder: number;
    imageUrl: string;
    iconUrl: string;
}

export interface IAddProduct {
    name: string;
    prize: number;
    quantity: number;
    availability: boolean;
    brand: string;
    categoryId: number;
    categoryName: string;
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
    categoryId: number;
    categoryName: string;
    description: string;
    image: File | null;
    imageURL: string;
}

export interface IProductFilter {
    name: string;
    brand: string;
    categoryName: string;
}

export interface IProductReviewForm {
    rating: number;
    title: string;
    content: string;
    media: any[];
}

export interface IProductReview {
    id: number;
    reviewer: User;
    rating: number;
    title: string;
    content: string;
    mediaUrls: string;
    verifiedPurchase: boolean;
    helpfulCount: number;
    reportCount: number;
}

export interface IProductReviewStats {
    averageRating: number;
    totalRatings: number;
    counts: { [key: number]: number };
    percentages: { [key: number]: number };
}