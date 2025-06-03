import { AxiosResponse } from "axios";
import { apiPrivate } from "../config/axios";
import { ICart } from "../interfaces/Cart";
import { IProduct } from "../interfaces/Product";
import { userCartItemURL, userCartURL } from "../constants/apiEndPoints";

class CartService {
    static async removeCartItem(userId: number, itemId: number): Promise<ICart> {
        const { data } = await apiPrivate.put<ICart>(`${userCartItemURL(userId, itemId)}/remove`);
        return data;
    }
    static async updateCartItemQuantity(userId: number, itemId: number, quantity: number): Promise<ICart> {
        const { data } = await apiPrivate.put<ICart>(`${userCartItemURL(userId, itemId)}/addQuantity?quantity=${quantity}`);
        return data;
    }

    static async addItemToCart(userId: Number, product: IProduct) {
        const { data } = await apiPrivate.post(userCartURL(userId), product);
        return data;
    }

    static async getUserCart(userId: Number) {
        const resp: AxiosResponse<ICart> = await apiPrivate.get<ICart>(userCartURL(userId));
        return resp.data;
    }

}

export default CartService;