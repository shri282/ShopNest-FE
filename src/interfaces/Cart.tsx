export interface ICart {
    id: number;
    userId: number;
    sessionId: string | null;
    status: string;
    totalItems: number;
    totalQuantity: number;
    subtotalPrice: number;
    discountAmount: number;
    taxAmount: number;
    shippingCost: number;
    grandTotal: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string | null;
    items: ICartItem[];
}

export interface ICartItem {
    id: number;
    productId: number;
    variantId: number | null;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
    customAttributes: any | null;
    addedAt: string | null;
    updatedAt: string;
}