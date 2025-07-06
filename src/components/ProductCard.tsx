import React from 'react'
import { IProduct } from '../interfaces/Product'
import "./css/productCard.css"
import ProgressiveImage from '../common/ProgressiveImage';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className='product-container' onClick={() => navigate(`/product/${product.id}`)}>
      <ProgressiveImage
        width='100%'
        height='200px'
        src={product.imageURL}
        alt="Product"
      />
      <div>
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <span>{product.prize}</span>
      </div>
    </div>
  )
}

export default ProductCard