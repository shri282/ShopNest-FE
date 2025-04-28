import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import "./css/home.css"
import { Button } from '@mui/material';
import AddProductPopup from '../components/popups/AddProductPopup';
import FallBackWrapper from '../common/FallBackWrapper';
import ProductService from '../services/ProductService';
import UpdateProductPopup from '../components/popups/UpdateProductPopup';

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = React.useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error: any) {
      setError(error);
    }
  }, [])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='home-container'>

      <Header />

      <div className='product-action'>
        <h4>Total products: {products?.length || 0}</h4>
        <Button variant="outlined" onClick={() => setOpen(true)}>Add product</Button>
      </div>

      <div className='products'>
        <FallBackWrapper fallback={(() => Boolean(error?.message))()} fallbackComponent={<div>ddd</div>}>
          <ProductCards products={products} />
        </FallBackWrapper>
      </div>

      <div className='popups'>
        {
          products.length && <UpdateProductPopup open={open} setOpen={setOpen} product={products[0]} />
        }
        {/* <AddProductPopup open={open} setOpen={setOpen} /> */}
      </div>

    </div>
  );
}

export default Home;