export interface ICart {
    id: number;
    userId: number;
    status: string;
    subtotalPrice: number;
    discountAmount: number;
    taxAmount: number;
    shippingCost: number;
    grandTotal: number;
    currency: string;
    items: ICartItem[];
}

export interface ICartItem {
    id: number;
    productId: number;
    productName: string;
    imageURL: string;
    availability: boolean;
    quantity: number;
    unitPrice: number;
}

export interface ICheckoutSession {
    sessionId: string;
}

export interface IWishlistSummary {
    id: number;
    name: string;
    default: boolean;
}

export interface IWishlistDetail {
    id: number;
    name: string;
    wishlistItems: IWishlistItem[];
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