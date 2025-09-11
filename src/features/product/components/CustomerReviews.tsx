import {
  Box,
  Typography,
  Paper,
  Rating,
  Divider,
  Avatar,
  Stack,
  Chip,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Grid,
} from '@mui/material';
import { ThumbUpOutlined, ThumbDownOutlined, CheckCircle } from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react';
import ProductService from '../../../services/ProductService';
import { IProductReview } from '../../../interfaces/Product';
import { formatDate } from '../../../utils/date';
import DataState from '../../../common/DataState';

interface CustomerReviewsProps {
  productId: number;
  reviewSubmitted: boolean;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productId, reviewSubmitted }) => {
  const [reviews, setReviews] = useState<IProductReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const [sort, setSort] = useState<'newest' | 'oldest' | 'lowest rating' | 'highest rating'>('newest');
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      try {
        const reviewsData = await ProductService.fetchProductReviews(productId);
        setReviews(reviewsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, reviewSubmitted]);

  const sortedReviews = useMemo(() => {
    return [...reviews]
      .filter(r => !filter || Math.round(r.rating) === filter)
      .sort((a, b) => {
        if (sort === 'newest' || sort === 'oldest') {
          const d1 = new Date(a.createdAt ?? '').getTime();
          const d2 = new Date(b.createdAt ?? '').getTime();
          return sort === 'newest' ? d2 - d1 : d1 - d2;
        }

        if (sort === 'highest rating') {
          return b.rating - a.rating;
        }

        if (sort === 'lowest rating') {
          return a.rating - b.rating;
        }

        return 0;
      });
  }, [reviews, filter, sort]);


  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" fontWeight="bolder">
          Customer Reviews ({reviews.length})
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {/* Sort */}
          <Box>
            <Typography variant="caption" mr={1}>
              Sort by:
            </Typography>
            <Select
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value as 'newest' | 'oldest' | 'lowest rating' | 'highest rating')}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="lowest rating">Lowest rating</MenuItem>
              <MenuItem value="highest rating">Highest rating</MenuItem>
            </Select>
          </Box>

          {/* Filter */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption">Filter by rating:</Typography>
            <ToggleButtonGroup
              size="small"
              value={filter ?? 'all'}
              exclusive
              onChange={(_, v) => setFilter(v === 'all' ? null : v)}
            >
              <ToggleButton value="all">All</ToggleButton>
              {[5, 4, 3, 2, 1].map(r => (
                <ToggleButton key={r} value={r}>
                  {r}★
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </Stack>

      {/* Reviews list */}
      <Box
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          p: 1,
        }}
      >
        <DataState
          data={reviews}
          error={error}
          loading={loading}
          fallback={
            <Typography variant="body2" color="text.secondary">
              No reviews yet.
            </Typography>
          }
          render={() => (
            <Stack spacing={2}>
              {sortedReviews.map((review, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}
                >
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>
                        {review.reviewer?.username?.[0]?.toUpperCase() ?? 'A'}
                      </Avatar>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.reviewer?.username ?? 'Anonymous'}
                          </Typography>
                          <Chip
                            label="Verified"
                            size="small"
                            icon={<CheckCircle fontSize="small" />}
                            color="success"
                          />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(review.createdAt, 'MMMM dd, yyyy')}
                        </Typography>
                      </Box>
                    </Stack>
                    <Rating value={review.rating ?? 0} precision={0.5} readOnly />
                  </Stack>

                  {/* Title */}
                  {review.title && (
                    <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                      {review.title}
                    </Typography>
                  )}

                  {/* Content */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}
                  >
                    {review.content}
                  </Typography>

                  {/* Media Section */}
                  {review.mediaUrls && review.mediaUrls.length > 0 && (
                    <Grid container spacing={2} mt={1}>
                      {review.mediaUrls.split(',').map((url, idx) => (
                        <Grid size={{ xs: 4, sm: 3, md: 2 }} key={idx}>
                          <Paper
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              '&:hover': { opacity: 0.8 },
                            }}
                          >
                            <img
                              src={url}
                              alt={`review-media-${idx}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <Divider sx={{ my: 1 }} />

                  {/* Helpful */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Was this helpful?
                    </Typography>
                    <IconButton size="small">
                      <ThumbUpOutlined fontSize="small" />
                      <Typography variant="caption" ml={0.5}>
                        12
                      </Typography>
                    </IconButton>
                    <IconButton size="small">
                      <ThumbDownOutlined fontSize="small" />
                      <Typography variant="caption" ml={0.5}>
                        1
                      </Typography>
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        />

      </Box>
    </Box>
  );
};

export default CustomerReviews;