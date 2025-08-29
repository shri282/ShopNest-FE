import { Box, Typography, Paper, Rating, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import { IProductReview } from '../../../interfaces/Product';

interface CustomerReviewsProps {
  productId: number;
  reviewSubmitted: boolean;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productId, reviewSubmitted }) => {
  const [reviews, setReviews] = useState<IProductReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await ProductService.fetchProductReviews(productId);
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [productId, reviewSubmitted]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Heading (fixed, not scrollable) */}
      <Typography variant="h5" fontWeight="bolder" gutterBottom>
        Customer Reviews ({reviews.length})
      </Typography>

      {/* Scrollable reviews list */}
      <Box
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          pr: 1,
        }}
      >
        {reviews && reviews.length > 0 ? (
          <Box sx={{ display: 'flex', p: 1, flexDirection: 'column', gap: 2 }}>
            {reviews.map((review, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.reviewer?.username ?? 'Anonymous'}
                  </Typography>
                  <Rating value={review.rating ?? 0} precision={0.5} readOnly size="small" />
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {review.content}
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CustomerReviews;