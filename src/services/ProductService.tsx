import { IProduct, IAddProduct, IUpdateProduct, IProductFilter, IProductCategory } from '../interfaces/Product';
import { apiPrivate, apiPrivateMultiPart } from '../config/axios';
import { GET_PAGINATED_PRODUCTS, PRODUCTS_CATEGORIES_ENDPOINT, PRODUCTS_ENDPOINT, SEARCH_PRODUCT } from '../constants/apiEndPoints';

class ProductService {
    
    static async getProducts() {
        const response = await apiPrivate.get<IProduct[]>(PRODUCTS_ENDPOINT);
        return response.data;
    }

    static async getProductsCategories() {
        const response = await apiPrivate.get<IProductCategory[]>(PRODUCTS_CATEGORIES_ENDPOINT);
        return response.data;
    }
    
    static async getPaginatedProducts({ page, pageSize }: any) {
        const response = await apiPrivate.get<any>(`${GET_PAGINATED_PRODUCTS}?page=${page}&size=${pageSize}`)
        return response.data;
    } 
    
    static async getProduct(id: number) {
        const response = await apiPrivate.get<IProduct>(`${PRODUCTS_ENDPOINT}/${id}`);
        return response.data;
    }

    static async searchProducts(field: String, keyword: String) {
        const response = await apiPrivate.get<IProduct[]>(`${SEARCH_PRODUCT}?${field}=${keyword}`);
        return response.data;
    }

    static async addProduct(data: IAddProduct) {
        const formData = new FormData();

        const { image, ...productObj } = data;

        formData.append('product', new Blob([JSON.stringify(productObj)], {
            type: 'application/json'
        }));

        if (image) {
            formData.append('image', image);
        }

        const product = apiPrivateMultiPart.post(PRODUCTS_ENDPOINT, formData);

        return product;
    }

    static async updateProduct(data: IUpdateProduct) {
        const formData = new FormData();

        const { image, ...productObj } = data;

        formData.append('product', new Blob([JSON.stringify(productObj)], { type: 'application/json' }));

        if (image) {
            formData.append('image', image);
        }

        const product = await apiPrivateMultiPart.put(PRODUCTS_ENDPOINT, formData);

        return product;
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