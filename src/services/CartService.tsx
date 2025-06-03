import { AxiosResponse } from "axios";
import { apiPrivate } from "../config/axios";
import { ICart } from "../interfaces/Cart";
import { IProduct } from "../interfaces/Product";

class CartService {
    static async removeCartItem(userId: number | undefined, itemId: number): Promise<ICart> {
        const { data } = await apiPrivate.put<ICart>(`/users/${userId}/cart/cartItem/${itemId}/remove`);
        return data;
    }
    static async updateCartItemQuantity(userId: number, itemId: number, quantity: number): Promise<ICart> {
        const { data } = await apiPrivate.put<ICart>(`/users/${userId}/cart/cartItem/${itemId}/addQuantity?quantity=${quantity}`);
        return data;
    }

    static async addItemToCart(userId: Number, product: IProduct) {
        const { data } = await apiPrivate.post(`/users/${userId}/cart`, product);
        return data;
    }

    static async getUserCart(userId: Number) {
        const resp: AxiosResponse<ICart> = await apiPrivate.get<ICart>(`/users/${userId}/cart`);
        return resp.data;
    }

}

export default CartService;