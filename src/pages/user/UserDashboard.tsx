import React from 'react';
import "../css/user-dashboard.css"
import SideDrawer from '../../components/admin/SideDrawer';
import Header from '../../components/Header';
import Products from '../../components/Products';

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
    component: <Products />,
    default: true
  },
]

const UserDashboard: React.FC = () => {

  return (
    <div className='user-dashboard'>
      <SideDrawer navs={navs} Header={<Header />}></SideDrawer>
    </div>
  );
}

export default UserDashboard;