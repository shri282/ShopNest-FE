import React, { useState } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import { NavItem } from '../../../interfaces/User';
import { Box } from '@mui/material';
import PromotionalBanner from '../../../common/PromotionalBanner';
import Products from '../features/products/Products';

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
    <UserLayout
      navs={navs}
      selectedNav={selectedNav}
      onSelectNav={setSelectedNav}
    >
      <Box>
        <PromotionalBanner
          title="Monsoon Mega Sale"
          subtitle="Up to 70% Off"
          description="Rainy days just got better! Save big on electronics, clothing, and home essentials only on ShopNest."
          ctaText="Shop Now"
          ctaLink="/sale"
          imageUrl="/images/galina-n-miziNqvJx5M-unsplash.jpg"
          bgColor="#047857"
          textColor="white"
        />
      </Box>
      <Products />
    </UserLayout>
  );
};

export default UserDashboard;
