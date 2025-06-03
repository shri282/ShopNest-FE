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
    availability: boolean;
    quantity: number;
    unitPrice: number;
}