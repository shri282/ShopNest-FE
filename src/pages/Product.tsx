import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { IProduct } from '../interfaces/Product';
import FallBackWrapper from '../common/FallBackWrapper';
import ProductService from '../services/ProductService';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);

    const getProduct = useCallback(async () => {
        try {
            const productObj = await ProductService.getProduct(Number(id));
            setProduct(productObj);
        } catch (error) {
            console.log(error);
        }
    }, [id]) 
    
    useEffect(() => {
        if (!id) return;
        getProduct();
    }, [id, getProduct])

  return (
    <div>
        <Header />
        <FallBackWrapper fallback={(() => !Boolean(product))()} fallbackComponent={<div>fetching product.........</div>}>
            <div>{JSON.stringify(product)}</div>
        </FallBackWrapper>
    </div>
  )
}

export default Product