import React from 'react';
import "../css/user-dashboard.css"
import SideDrawer from '../../common/SideDrawer';
import Header from '../../components/Header';
import Products from '../../components/Products';

const navs = [
  {
    id: 1,
    name: 'orders',
    component: <div>orders</div>,
    iconSrc: 'images/order.png',
    default: false
  },
  {
    id: 2,
    name: 'products',
    component: <Products />,
    iconSrc: 'images/collection.png',
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