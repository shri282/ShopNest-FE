import React from 'react';
import { Box } from '@mui/material';
import PromotionalBanner from '../../common/PromotionalBanner';
import Products from '../product/components/Products';
import ShopByCategory from './components/ShopByCategory';
import NewArrivals from './components/NewArrivals';
import OurProducts from './components/OurProducts';

const UserDashboard: React.FC = () => {

  return (
    <Box>
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
      <ShopByCategory />
      <NewArrivals />
      <OurProducts />
      <Products />
    </Box>
  );
};

export default UserDashboard;
