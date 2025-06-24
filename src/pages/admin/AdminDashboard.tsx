import React from 'react';
import Header from '../../components/Header';
import "../css/user-dashboard.css"
import AdminSideDrawer from '../../components/admin/SideDrawer';
import ProductListTable from '../../components/admin/ProductsListTable';

const navs = [
  {
    id: 1,
    name: 'products',
    component: <div>products</div>,
    default: false
  },
  {
    id: 2,
    name: 'orders',
    component: <div>orders</div>,
    default: false
  },
  {
    id: 3,
    name: 'products',
    component: <ProductListTable />,
    default: true
  },
]

const AdminDashboard: React.FC = () => {

  return (
    <div className='home-container'>
      <AdminSideDrawer navs={navs} Header={<Header />}></AdminSideDrawer>
    </div>
  );
}

export default AdminDashboard;