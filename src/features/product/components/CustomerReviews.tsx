import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductService from '../../../services/ProductService';
import { IProductReview } from '../../../interfaces/Product';

interface CustomerReviewsProps {
  productId: number
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<IProductReview[]>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await ProductService.fetchProductReviews(productId);
        setReviews(reviewsData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <>
        <Typography variant='h5' fontWeight={'bolder'}>Customer Reviews</Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          {
            (reviews && reviews.length) ? reviews.map(review => JSON.stringify(review)) : null
          }
        </Box>
    </>
  )
}

export default CustomerReviews