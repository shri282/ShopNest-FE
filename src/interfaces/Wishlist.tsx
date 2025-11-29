export interface IWishlistSummary {
    id: number;
    name: string;
    default: boolean;
}

export interface IWishlistItem {
    id: number;
    wishlistId: number;
    productId: number;
    productName: string;
    productDescription: string;
    productPrize: number;
    productImageUrl: string;
    priority: number;
    notes: string;
    addedAt: Date;
}

export interface IWishlistDetail {
    id: number;
    name: string;
    wishlistItems: IWishlistItem[];
}