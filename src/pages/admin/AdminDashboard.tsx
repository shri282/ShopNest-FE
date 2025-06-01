import React from 'react';
import Header from '../../components/Header';
import "../css/user-dashboard.css"
import AdminSideDrawer from '../../components/admin/AdminSideDrawer';
import ProductListTable from '../../components/admin/ProductsListTable';

const AdminDashboard: React.FC = () => {

  return (
    <div className='home-container'>
      <AdminSideDrawer Header={<Header />}>
        <ProductListTable />
      </AdminSideDrawer>
    </div>
  );
}

export default AdminDashboard;