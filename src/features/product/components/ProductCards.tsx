import React from 'react'
import { IProduct } from '../../../interfaces/Product';
import ProductCard from './ProductCard';
import "../../../css/productCards.css"

interface ProductCardsProps {
  products: IProduct[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {

  return (
    <div className='products'>
      {
        Array.isArray(products) && products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })
      }
    </div>
  )
}

export default ProductCards