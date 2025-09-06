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
}

export interface IWishlistDetail {
    id: number;
    name: string;
    wishlistItems: IWishlistItems;
}

export interface IWishlistItems {
    id: number;
    wishlistId: number;
    productId: number;
    productName: string;
    priority: number;
    notes: string;
    addedAt: Date;
}