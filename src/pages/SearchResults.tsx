import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import ProductCards from '../features/product/components/ProductCards';

const SearchResults: React.FC = () => {

    const location = useLocation();
    const products = location.state || [];
    return (
        <div>
            <Header />
            <ProductCards products={products} />
        </div>
    )
}

export default SearchResults