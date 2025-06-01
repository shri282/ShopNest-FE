import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCards from '../components/ProductCards';
import { IProduct } from '../interfaces/Product';
import "./css/home.css"
import FallBackWrapper from '../common/FallBackWrapper';
import ProductService from '../services/ProductService';
import ResponsiveDrawer from '../components/SideDrawer';
import ProductListTable from '../components/ProductsListTable';

const Home: React.FC = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<Error | null>(null);

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

      <ResponsiveDrawer Header={<Header />}>
          <FallBackWrapper fallback={(() => Boolean(error?.message))} fallbackComponent={<div>ddd</div>}>
            <ProductListTable />
            <div className='products'>
                <ProductCards products={products} />
            </div>
          </FallBackWrapper>
      </ResponsiveDrawer>
      
    </div>
  );
}

export default Home;