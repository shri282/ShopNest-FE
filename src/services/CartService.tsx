import { apiPrivate } from "../config/axios";
import { IProduct } from "../interfaces/Product";

class CartService {

    static async addItemToCart(userId: Number, product: IProduct) {
        const cart = await apiPrivate.post(`/users/${userId}/cart`, product);
        return cart;
    }

    static async getUserCart(userId: Number) {
        const resp = await apiPrivate.get(`/users/${userId}/cart`);
        return resp.data;
    }

}

export default CartService;