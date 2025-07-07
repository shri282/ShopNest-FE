import React, { useState } from 'react';
import DashboardLayout from '../../common/DashboardLayout';
import { NavItem } from '../../interfaces/User';
import Products from '../../components/Products';
import { Box } from '@mui/material';
import PromotionalBanner from '../../common/PromotionalBanner';

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
      <Box>
        <PromotionalBanner
          title="Prime Day Deals"
          subtitle="July 12-14"
          description="Exclusive deals for Prime members only. Save big on electronics, fashion, and more!"
          ctaText="Join Prime at ₹1499/year"
          ctaLink="/prime"
          imageUrl="/images/galina-n-miziNqvJx5M-unsplash.jpg"
          bgColor="#2563eb"
          textColor='white'
        />
      </Box>
      <Products />
    </DashboardLayout>
  );
};

export default UserDashboard;
