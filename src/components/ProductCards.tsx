import React from 'react'
import { Product } from '../interfaces/Product';
import ProductCard from './ProductCard';
import "./css/productCards.css"

interface ProductCardsProps {
    products: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  return (
    <div className='products'>
        {
            products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
            })
        }
    </div>
  )
}

export default ProductCards