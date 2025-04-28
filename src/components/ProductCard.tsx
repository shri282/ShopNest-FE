import React from 'react'
import { IProduct } from '../interfaces/Product'
import "./css/productCard.css"

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='product-container' data-product-id={product.id}>
      <h6 style={{display:'none'}} className='product-id'>{product.id}</h6>
      <img src={product.image ? `data:image/jpeg;base64,${product.image}` : "images/galina-n-miziNqvJx5M-unsplash.jpg"} alt="" />
        <div>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <span>{product.prize}</span>
        </div>
    </div>
  )
}

export default ProductCard