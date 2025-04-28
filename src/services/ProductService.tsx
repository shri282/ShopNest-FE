import axios from 'axios';
import { Product, AddProduct } from '../interfaces/Product';

class ProductService {

    static async addProduct(data: AddProduct) {
        const formData = new FormData();

        const productObj = {
            name: data.name,
            brand: data.brand,
            availability: data.availability,
            category: data.category,
            description: data.description,
            prize: data.prize,
            quantity: data.quantity
        };

        formData.append('product', new Blob([JSON.stringify(productObj)], {
            type: 'application/json'
        }));

        if (data.image) {
            formData.append('image', data.image);
        }

        const product = axios.post('http://localhost:8080/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return product;
    }

    static async getProducts() {
        const response = await axios.get<Product[]>("http://localhost:8080/products", {
            headers: {
                // 'Authorization': 'Bearer your_token_here',
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }

}

export default ProductService;