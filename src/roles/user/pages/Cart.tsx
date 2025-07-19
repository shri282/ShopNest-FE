import React, { useCallback, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ErrorSnackbar from '../../../common/ErrorSnackBar';
import {
    Box,
    Button,
} from '@mui/material';
import { useUserCart } from '../hooks/useUserCart';
import DataState from '../../../common/DataState';
import OrderSummary from '../features/order/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { ICheckoutSession } from '../../../interfaces/Cart';
import CartService from '../../../services/CartService';
import LoadingOverlay from '../../../common/LoadingOverlay';
import ShoppingCartList from '../features/cart/ShoppingCartList';

const Cart: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { cart, setCart, error, loading } = useUserCart(user?.id);
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    const handleCheckout = useCallback(async () => {
        if (!cart?.id) return;
        setIsApiLoading(true);

        try {
            const stripe = await loadStripe("pk_test_51RcRvOI2BykSxmKfjrk3CkwHOXKKXJOlWNXIEXUAoYzbkP5LUqXLHdJo4simz0NIqZOH5TIaqXdYVKWY70nXBlju00WvBXUphq");

            const checkoutSession: ICheckoutSession = await CartService.checkoutCart(cart?.id);
            stripe?.redirectToCheckout({
                sessionId: checkoutSession.sessionId,
            })
        } catch (error) {
            console.log(error);
        } finally {
            setIsApiLoading(false);
        }

    }, [cart]);

    return (
        <div className="user-dashboard">
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
                        alignSelf: 'flex-start',
                        boxSizing: 'border-box'
                    }}>
                        <Box sx={{ width: '70%' }}>
                            <ShoppingCartList setIsLoading={setIsApiLoading} cart={cart} setCart={setCart} />
                            <Box mt={3}>
                                <Button onClick={() => navigate('/')} color="primary" sx={{ textTransform: 'none' }}>
                                    ← Continue Shopping
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ position: 'sticky', top: 90, overflow: 'hidden', alignSelf: 'flex-start' }}>
                            <OrderSummary onCheckout={handleCheckout} cart={cart} />
                        </Box>
                    </Box>
                }
            />

            <LoadingOverlay loading={isApiLoading} />
            <ErrorSnackbar
                open={errorPopupOpen}
                message={error?.message || 'An unexpected error occurred.'}
                onClose={() => setErrorPopupOpen(false)}
            />
        </div>
    );
};

export default Cart;