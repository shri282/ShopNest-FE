import React, { useState } from 'react';
import "../css/user-dashboard.css"
import ProductListTable from '../../components/admin/ProductsListTable';
import DashboardLayout from '../../common/DashboardLayout';
import { NavTag } from '../../enum/NavTag';
import { NavItem } from '../../interfaces/User';

const navs = [
  {
    id: 1,
    name: NavTag.ORDERS,
    component: <div>orders</div>,
    icon: 'images/order.png',
  },
  {
    id: 2,
    name: NavTag.PRODUCTS,
    component: <ProductListTable />,
    icon: 'images/order.png',
  }
]

const AdminDashboard: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState<NavItem | null>(null);

  return (
    <div className='home-container'>
      <DashboardLayout
        navs={navs}
        selectedNav={selectedNav}
        onSelectNav={setSelectedNav}
      >
        <div>admin dashboard</div>
      </DashboardLayout>
    </div>
  );
}

export default AdminDashboard;