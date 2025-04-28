import axios from 'axios';
import { IProduct, IAddProduct, IUpdateProduct } from '../interfaces/Product';

class ProductService {

    static async addProduct(data: IAddProduct) {
        const formData = new FormData();

        const { image, ...productObj } = data;

        formData.append('product', new Blob([JSON.stringify(productObj)], {
            type: 'application/json'
        }));

        if (image) {
            formData.append('image', image);
        }

        const product = axios.post('http://localhost:8080/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return product;
    }

    static async updateProduct(data: IUpdateProduct) {
        const formData = new FormData();

        const { image, ...productObj } = data;

        formData.append('product', new Blob([JSON.stringify(productObj)], { type: 'application/json' }));

        if (image) {
            formData.append('image', image);
        }

        const product = await axios.put(`http://localhost:8080/products`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return product;
    }

    static async getProducts() {
        const response = await axios.get<IProduct[]>("http://localhost:8080/products", {
            headers: {
                // 'Authorization': 'Bearer your_token_here',
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }

    static async getProduct(id: number) {
        const response = await axios.get<IProduct>(`http://localhost:8080/products/${id}`, {
            headers: {
                // 'Authorization': 'Bearer your_token_here',
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }

    static base64ToFile(base64String: String, filename: String, mimeType: String = 'image/jpeg'): File | null {
        if (!base64String) return null;

        const byteString = atob(base64String as string);
        const byteNumbers = new Array(byteString.length).fill(0).map((_, i) => byteString.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], filename as string, { type: mimeType as string });
    }

}

export default ProductService;