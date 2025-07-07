import React, { useState } from 'react';
import DashboardLayout from '../../common/DashboardLayout';
import Cart from '../Cart';
import { NavItem } from '../../interfaces/User';
import Products from '../../components/Products';

const navs = [
  {
    id: 1,
    name: 'Orders',
    component: <div>Orders Component</div>,
    icon: 'images/order.png',
  }
];

const UserDashboard: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState<NavItem | null>(null);

  return (
    <DashboardLayout
      navs={navs}
      selectedNav={selectedNav}
      onSelectNav={setSelectedNav}
    >
      <Products />
    </DashboardLayout>
  );
};

export default UserDashboard;
