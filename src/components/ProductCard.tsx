import React from 'react'
import { Product } from '../interfaces/Product'
import "./css/productCard.css"

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='product-container'>
          <img src="images/galina-n-miziNqvJx5M-unsplash.jpg" alt="" />
        <div>
            <h5>{product.name}</h5>
            <p>{product.description} ghjbvgfgghjnvcd fghjnbvf dsfhb sddhsfbsn snbdfhs hgeygns jsdfhdsfn</p>
            <span>{product.prize}</span>
        </div>
    </div>
  )
}

export default ProductCard