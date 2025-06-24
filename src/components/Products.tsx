import React, { useCallback, useEffect, useState } from 'react'
import ProductService from '../services/ProductService';
import { IProduct } from '../interfaces/Product';
import ErrorSnackbar from '../common/ErrorSnackBar';
import DataState from '../common/DataState';
import ProductCards from './ProductCards';

const Products: React.FC = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);

        try {
            const data = await ProductService.getProducts();
            setProducts(data);
        } catch (error: any) {
            setError(error);
            setErrorPopupOpen(true);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div>
            <DataState
                data={products}
                error={error}
                loading={loading}
                render={(products) => <ProductCards products={products} />}
            />
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </div>
    )
}

export default Products