import React, { useState } from 'react';
import {
  Box, Button, Rating, TextField, Typography, Paper, Stack, Collapse, IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { IProduct, IProductReviewForm } from '../../../interfaces/Product';
import ProductService from '../../../services/ProductService';
import { useAuth } from '../../../context/AuthContext';
import InfoSnackbar from '../../../common/InfoSnackBar';
import ErrorSnackbar from '../../../common/ErrorSnackBar';

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

  const [submitLoader, setSubmitLoader] = useState<boolean>(false);
  const [openInfoSnackBar, setOpenInfoSnackBar] = useState<boolean>(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openForm, setOpenForm] = useState<boolean>(false);

  const onSubmit = async (data: IProductReviewForm) => {
    if (!user) return;
    setSubmitLoader(true);

    try {
      await ProductService.addReviewForProduct(user.id, product.id, data);
      reset();
      setMessage("Review submitted successfully!");
      setOpenInfoSnackBar(true);
      setOpenForm(false); // collapse after submit
    } catch (error: any) {
      setMessage(error.message);
      setOpenErrorSnackBar(true);
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, maxWidth: 600 }}>
      {/* Header Section */}
      {!openForm && (
        <Box textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Review this product
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Share your thoughts with other customers
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenForm(true)}
            sx={{
              borderRadius: '50px',
              textTransform: 'none',
              py: 1.5,
              fontWeight: 500
            }}
          >
            Write a product review
          </Button>
        </Box>
      )}

      {/* Collapsible Form */}
      <Collapse in={openForm} timeout={500}>
        {openForm && (
          <Box mt={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Write a Review
              </Typography>
              <IconButton onClick={() => setOpenForm(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Rating */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bolder" gutterBottom>
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
                <TextField
                  {...register('title', { required: 'Title is required' })}
                  label="Title"
                  placeholder="Summarize your experience"
                  fullWidth
                />

                {/* Review */}
                <TextField
                  {...register('content', { required: 'Review is required' })}
                  label="Review"
                  placeholder="Tell others about your experience..."
                  fullWidth
                  multiline
                  rows={4}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={submitLoader}
                  sx={{ textTransform: 'none' }}
                >
                  {submitLoader ? "Submitting..." : "Submit Review"}
                </Button>
              </Stack>
            </form>
          </Box>
        )}
      </Collapse>

      <InfoSnackbar open={openInfoSnackBar} message={message} onClose={() => setOpenInfoSnackBar(false)} />
      <ErrorSnackbar open={openErrorSnackBar} message={message} onClose={() => setOpenErrorSnackBar(false)} />
    </Paper>
  );
};

export default WriteReview;