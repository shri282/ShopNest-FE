import React from 'react';
import { Box, Button, Rating, TextField, Typography, Paper, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { IProduct, IProductReviewForm } from '../../../interfaces/Product';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import ProductService from '../../../services/ProductService';
import { useAuth } from '../../../context/AuthContext';

interface WriteReviewProps {
  product: IProduct;
}

const WriteReview: React.FC<WriteReviewProps> = ({ product }) => {
  const { user } = useAuth();
  const { control, register, handleSubmit, reset } = useForm<IProductReviewForm>({
    defaultValues: {
      rating: 0,
      title: '',
      content: '',
      media: [],
    },
  });

  const onSubmit = async (data: IProductReviewForm) => {
    console.log('Review Submitted:', data);
    if(!user) return;

    try {
      const resp = await ProductService.addReviewForProduct(user.id, product.id, data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      reset();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Rating */}
          <Box>
            <Typography variant="subtitle1" fontWeight={'bolder'} gutterBottom>
              Overall Rating
            </Typography>
            <Controller
              name="rating"
              control={control}
              rules={{ required: 'Rating is required' }}
              render={({ field }) => (
                <Rating
                  {...field}
                  value={Number(field.value)}
                  onChange={(_, value) => field.onChange(value)}
                  precision={0.5}
                  size="large"
                />
              )}
            />
          </Box>

          {/* Title */}
          <Box>
            <Typography sx={{ marginBottom: 1 }}>Title</Typography>
            <TextField
              {...register('title', { required: 'Title is required' })}
              placeholder="Summarize your experience"
              fullWidth
              variant="outlined"
            />
          </Box>

          {/* Review */}
          <Box>
            <Typography sx={{ marginBottom: 1 }}>Review</Typography>
            <TextField
              {...register('content', { required: 'Review is required' })}
              placeholder="Tell others about your experience. What did you like or dislike?"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>

          {/* Photos */}
          <Box>
            <Typography sx={{ marginBottom: 1 }}>Upload Photos</Typography>
            <Controller
              name="media"
              control={control}
              render={({ field }) => (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ textTransform: 'none' }}
                  >
                    Choose Files
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(e) => {
                        if (!e.target.files) return;
                        const newFiles = Array.from(e.target.files);
                        const updatedFiles = [...(field.value || []), ...newFiles];
                        field.onChange(updatedFiles);
                      }}
                    />
                  </Button>

                  {/* Preview */}
                  {field.value && field.value.length > 0 && (
                    <Box mt={2} sx={{ p: 2, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        {field.value.map((file: File, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              width: 90,
                              height: 90,
                              borderRadius: 1,
                              border: '1px solid #ddd',
                              overflow: 'hidden',
                              backgroundColor: '#fff',
                            }}
                          >
                            {/* Remove Button */}
                            <IconButton
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 2,
                                right: 2,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                                zIndex: 2,
                              }}
                              onClick={() => {
                                const updatedFiles = field.value.filter((_, i) => i !== index);
                                field.onChange(updatedFiles);
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>

                            {/* Image */}
                            <Box
                              component="img"
                              src={URL.createObjectURL(file)}
                              alt={`preview-${index}`}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </>
              )}
            />
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ backgroundColor: 'black', textTransform: 'none' }}
          >
            Submit Review
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default WriteReview;