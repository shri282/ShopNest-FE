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
  onReviewSubmit: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({ product, onReviewSubmit }) => {
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
      onReviewSubmit();
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