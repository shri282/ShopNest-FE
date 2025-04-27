import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import "./css/home.css"

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

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
      {
        error?.message || <ProductCards products={products || []} />
      }
    </div>
  );
}

export default Home;