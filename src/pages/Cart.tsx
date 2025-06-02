import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSideDrawer from '../components/admin/AdminSideDrawer';
import ErrorSnackbar from '../common/ErrorSnackBar';
import Header from '../components/Header';
import CartService from '../services/CartService';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ICart } from '../interfaces/Cart';
import axios from 'axios';

const Cart: React.FC = () => {
    const { user } = useAuth();

    const [cart, setCart] = useState<ICart | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    const fetchUserCart = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);

        try {
            const cart: ICart = await CartService.getUserCart(user.id);
            setCart(cart);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                setCart(null);
            } else {
                setError(err as Error);
                setErrorPopupOpen(true);
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchUserCart();
    }, [fetchUserCart]);

    return (
        <div className="user-dashboard">
            <AdminSideDrawer Header={<Header />}>
                <Typography variant="h5" gutterBottom>
                    Your Shopping Cart
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : cart ? (
                    <Box sx={{ mt: 2 }}>
                        <pre>{JSON.stringify(cart, null, 2)}</pre>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        No active cart found.
                    </Typography>
                )}
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
