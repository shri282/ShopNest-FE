import React, { useCallback, useEffect, useState } from 'react';
import "../css/user-dashboard.css"
import ProductService from '../../services/ProductService';
import { IProduct } from '../../interfaces/Product';
import ProductCards from '../../components/ProductCards';
import AdminSideDrawer from '../../components/admin/AdminSideDrawer';
import Header from '../../components/Header';
import ErrorSnackbar from '../../common/ErrorSnackBar';

const UserDashboard: React.FC = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<any>(null);
  const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error: any) {
      setError(error);
      setErrorPopupOpen(true);
    }
  }, [])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='user-dashboard'>
        <AdminSideDrawer Header={<Header />}>
            <ProductCards products={products} />
        </AdminSideDrawer>
        <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
    </div>
  );
}

export default UserDashboard;