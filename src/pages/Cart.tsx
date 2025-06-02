import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSideDrawer from '../components/admin/AdminSideDrawer';
import ErrorSnackbar from '../common/ErrorSnackBar';
import Header from '../components/Header';
import {
    Box,
    Typography,
    Button,
    CardMedia,
    Divider,
    TextField,
    MenuItem
} from '@mui/material';
import { useUserCart } from '../hooks/useUserCart';
import DataState from '../common/DataState';

const Cart: React.FC = () => {
    const { user } = useAuth();
    const { cart, error, loading } = useUserCart(user?.id);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    return (
        <div className="user-dashboard">
            <AdminSideDrawer Header={<Header />}>
                <DataState
                    data={cart}
                    error={error}
                    loading={loading}
                    render={(cart) =>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            margin: 'auto',
                            p: 3,
                            position: 'relative'
                        }}>
                            <Box sx={{
                                flex: 2,
                                pr: 4,
                                maxHeight: 'calc(100vh - 150px)',
                                overflowY: 'auto'
                            }}>
                                <Box mb={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h5">Shopping Cart</Typography>
                                    <Typography variant="subtitle2">{cart.items.length} Items</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2, px: 1 }}>
                                    <Box sx={{ width: '250px', fontWeight: 600 }}>Product Details</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '150px', fontWeight: 600 }}>
                                        Quantity
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, fontWeight: 600 }}>
                                        <Typography fontWeight={600}>Price</Typography>
                                        <Typography fontWeight={600}>Total</Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
                                    {cart.items.map((item, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 1 }}>
                                            <Box sx={{ width: '250px', display: 'flex', alignItems: 'center' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={'/images/galina-n-miziNqvJx5M-unsplash.jpg'}
                                                    alt={'img'}
                                                    sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
                                                />
                                                <Box>
                                                    <Typography variant="body1">{item.productName}</Typography>
                                                    <Typography sx={{ fontSize: 10, color: 'red' }} variant="body2">{item.availability ? 'In stock' : 'Out of stock'}</Typography>
                                                    <Button sx={{ fontSize: 12 }} size="small" color="secondary">Remove</Button>
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        minWidth: '24px',
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: 0,
                                                        lineHeight: 1,
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    -
                                                </Button>
                                                <Box
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        border: '1px solid #ccc',
                                                        mx: 1,
                                                        borderRadius: 1,
                                                        minWidth: 32,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        minWidth: '24px',
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: 0,
                                                        lineHeight: 1,
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Box>

                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography>£{item.price.toFixed(2)}</Typography>
                                                <Typography fontWeight="bold">£{(item.price * item.quantity).toFixed(2)}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box mt={3}>
                                    <Button color="primary" sx={{ textTransform: 'none' }}>
                                        ← Continue Shopping
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{
                                flex: 1,
                                ml: 4,
                                p: 2,
                                height: 'fit-content',
                                position: 'sticky',
                                top: 20,
                                border: '1px solid #ccc'
                            }}>
                                <Typography variant="h6" mb={2}>Order Summary</Typography>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Items</Typography>
                                    <Typography>£{''}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Shipping</Typography>
                                    <TextField
                                        select
                                        defaultValue="standard"
                                        size="small"
                                        sx={{ width: '60%' }}
                                    >
                                        <MenuItem value="standard">Standard Delivery – £{''}</MenuItem>
                                    </TextField>
                                </Box>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter your code"
                                    sx={{ mt: 2 }}
                                />
                                <Button fullWidth variant="contained" color="error" sx={{ mt: 1 }}>
                                    APPLY
                                </Button>
                                <Divider sx={{ my: 2 }} />
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography fontWeight="bold">Total Cost</Typography>
                                    <Typography fontWeight="bold">£{''}</Typography>
                                </Box>
                                <Button fullWidth variant="contained" sx={{ background: '#5c6bc0' }}>
                                    CHECKOUT
                                </Button>
                            </Box>
                        </Box>
                    }
                />
            </AdminSideDrawer>

            <ErrorSnackbar
                open={errorPopupOpen}
                message={error?.message || 'An unexpected error occurred.'}
                onClose={() => setErrorPopupOpen(false)}
            />
        </div>
    );
};

export default Cart;