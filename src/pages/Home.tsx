import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import "./css/home.css"
import { Button } from '@mui/material';
import AddProductPopup from '../components/popups/AddProductPopup';

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[] | null>(null);
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
      console.log("something went wrong ", error);
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
      <AddProductPopup open={open} setOpen={setOpen} />
      {
        error?.message || <ProductCards products={products || []} />
      }
    </div>
  );
}

export default Home;