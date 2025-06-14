import React from 'react'
import { IProduct } from '../interfaces/Product';
import ProductCard from './ProductCard';
import "./css/productCards.css"
import { useNavigate } from 'react-router-dom';

interface ProductCardsProps {
  products: IProduct[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {

  const navigate = useNavigate();

  const productClickedHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const productContainer = (e.target as HTMLElement).closest('.product-container');
    if (!productContainer) return;

    const productId = productContainer.getAttribute('data-product-id');
    if (!productId) return;

    const clickedProduct = products.find(p => p.id.toString() === productId);
    if (!clickedProduct) return;

    navigate(`/product/${productId}`);
  };



  return (
    <div onClick={productClickedHandler} className='products'>
        {
          Array.isArray(products) && products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })
        }
    </div>
  )
}

export default ProductCards