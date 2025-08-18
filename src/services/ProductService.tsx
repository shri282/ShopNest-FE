import { IProduct, IAddProduct, IUpdateProduct, IProductCategory } from '../interfaces/Product';
import { apiPrivate, apiPrivateMultiPart } from '../config/axios';
import { GET_PAGINATED_PRODUCTS, PRODUCTS_CATEGORIES_ENDPOINT, PRODUCTS_ENDPOINT, SEARCH_PRODUCT } from '../constants/apiEndPoints';

class ProductService {

    static async getProducts(filter: any = null) {
        const response = await apiPrivate.get<IProduct[]>(PRODUCTS_ENDPOINT, {
            params: filter
        });
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

    static getSearchResultMap(keyword: string, products: IProduct[]): Map<string, IProduct[]> {
        const searchRes = ProductService.mapToName(products);
        searchRes.set(keyword, products);
        return searchRes;
    }

    static mapToName(products: IProduct[]) {
        return products.reduce((acc: Map<string, IProduct[]>, product: IProduct) => {
            const key = product["name"];
            acc.set(key, [product]);
            return acc;
        }, new Map<string, IProduct[]>());
    }

}

export default ProductService;