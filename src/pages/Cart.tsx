import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSideDrawer from '../components/admin/SideDrawer';
import ErrorSnackbar from '../common/ErrorSnackBar';
import Header from '../components/Header';
import {
    Box,
    Button,
} from '@mui/material';
import { useUserCart } from '../hooks/useUserCart';
import DataState from '../common/DataState';
import ShoppingCartList from '../components/user/ShoppingCartList';
import OrderSummary from '../components/user/OrderSummary';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { cart, setCart, error, loading } = useUserCart(user?.id);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    return (
        <div className="user-dashboard">
            <Header />
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
                        gap: 4,
                        alignSelf: 'flex-start'
                    }}>
                        <Box sx={{ width: '70%' }}>
                            <ShoppingCartList cart={cart} setCart={setCart} />
                            <Box mt={3}>
                                <Button onClick={() => navigate('/')} color="primary" sx={{ textTransform: 'none' }}>
                                    ← Continue Shopping
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ position: 'sticky', top: 90, overflow: 'hidden', alignSelf: 'flex-start' }}>
                            <OrderSummary cart={cart} />
                        </Box>
                    </Box>
                }
            />

            <ErrorSnackbar
                open={errorPopupOpen}
                message={error?.message || 'An unexpected error occurred.'}
                onClose={() => setErrorPopupOpen(false)}
            />
        </div>
    );
};

export default Cart;