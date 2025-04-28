import React from 'react'
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import { useLocation } from 'react-router-dom';

const SearchResults: React.FC = () => {

    const location = useLocation();
    const products = location.state || [];
    return (
        <div>
            <Header />
            {
                <ProductCards products={products} />
            }
        </div>
    )
}

export default SearchResults