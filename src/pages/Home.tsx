import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import "./css/home.css"
import { Button } from '@mui/material';
import AddProductPopup from '../components/popups/AddProductPopup';
import FallBackWrapper from '../common/FallBackWrapper';

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = React.useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get<Product[]>("http://localhost:8080/products", {
        headers: {
          // 'Authorization': 'Bearer your_token_here',
          'Content-Type': 'application/json',
        }
      });

      setProducts(response.data);
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
          <AddProductPopup open={open} setOpen={setOpen} />
        }
      </div>

    </div>
  );
}

export default Home;