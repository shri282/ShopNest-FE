import axios from 'axios';
import { IProduct, IAddProduct, IUpdateProduct, IProductFilter } from '../interfaces/Product';

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
            headers: { 
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
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
            headers: { 
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            },
        });

        return product;
    }

    static async getProducts() {
        const response = await axios.get<IProduct[]>("http://localhost:8080/products", {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }

    static async getProduct(id: number) {
        const response = await axios.get<IProduct>(`http://localhost:8080/products/${id}`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }

    static async searchProducts(field: String, keyword: String) {
        const response = await axios.get<IProduct[]>(`http://localhost:8080/products/search?${field}=${keyword}`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
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

    static mapProductToSearchResults(field: string, keyword: string, products: IProduct[]): Map<string, IProduct[]> {
        
        if (field === "all") {
            const searchRes = ["name", "brand", "category"]
                .map(k => ProductService.groupBy((k as keyof IProductFilter), products))
                .reduce((acc, map) => {
                    map.forEach((value: IProduct[], key: string) => acc.set(key, value));
                    return acc;
                }, new Map());

            searchRes.set(keyword, products);
            return searchRes;
        }

        const searchRes = ProductService.groupBy(field as keyof IProductFilter, products);
        searchRes.set(keyword, products);
        return searchRes;
    }

    static groupBy(key: keyof IProductFilter, products: IProduct[]) {
        return products.reduce((acc: Map<string, IProduct[]>, product: IProduct) => {
            const value = product[key];
            const updated = acc.get(value) ?? [];
            return new Map(acc).set(value, [...updated, product]);
        }, new Map<string, IProduct[]>());
    }

}

export default ProductService;