import { AxiosResponse } from "axios";
import { apiPrivate } from "../config/axios";
import { ICart } from "../interfaces/Cart";
import { IProduct } from "../interfaces/Product";

class CartService {

    static async addItemToCart(userId: Number, product: IProduct) {
        const cart = await apiPrivate.post(`/users/${userId}/cart`, product);
        return cart;
    }

    static async getUserCart(userId: Number) {
        const resp: AxiosResponse<ICart> = await apiPrivate.get<ICart>(`/users/${userId}/cart`);
        return resp.data;
    }

}

export default CartService;