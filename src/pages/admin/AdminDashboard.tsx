import React from 'react';
import Header from '../../components/Header';
import "../css/user-dashboard.css"
import SideDrawer from '../../components/admin/SideDrawer';
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
      <SideDrawer navs={navs} Header={<Header />}></SideDrawer>
    </div>
  );
}

export default AdminDashboard;