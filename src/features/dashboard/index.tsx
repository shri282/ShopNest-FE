import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import PromotionalBanner from '../../common/PromotionalBanner';
import ShopByCategory from './ShopByCategory';
import NewArrivals from './NewArrivals';
import OurProducts from './OurProducts';

const UserDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const ourProductsRef = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    if (ourProductsRef.current) {
      ourProductsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box p={2} paddingTop={5} width={'100%'}>

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

      <ShopByCategory setSelectedCategory={handleCategorySelect} />

      <NewArrivals />
      
      <div ref={ourProductsRef}>
        <OurProducts category={selectedCategory} />
      </div>
    </Box>
  );
};

export default UserDashboard;
