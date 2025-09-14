import React, { useCallback, useState } from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import { useUserCart } from './hooks/useUserCart';
import DataState from '../../common/DataState';
import OrderSummary from '../order/components/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { ICheckoutSession } from '../../interfaces/Cart';
import CartService from '../../services/CartService';
import LoadingOverlay from '../../common/LoadingOverlay';
import ShoppingCartList from './components/ShoppingCartList';
import { ISnackbarState } from '../../common/types';
import SnackBar from '../../common/SnackBar';
import { useAuthContext } from '../../context/auth';

const Cart: React.FC = () => {
    const { authContextSelector } = useAuthContext();
    const user = authContextSelector.getUser();
    const navigate = useNavigate();

    // Init
    const { cart, setCart, error, loading } = useUserCart(user?.id);

    const [isApiLoading, setIsApiLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<ISnackbarState>({
        open: false,
        message: "",
        status: "Info"
    });

    const handleCheckout = useCallback(async () => {
        if (!cart?.id) return;
        setIsApiLoading(true);

        try {
            const stripe = await loadStripe("pk_test_51RcRvOI2BykSxmKfjrk3CkwHOXKKXJOlWNXIEXUAoYzbkP5LUqXLHdJo4simz0NIqZOH5TIaqXdYVKWY70nXBlju00WvBXUphq");

            const checkoutSession: ICheckoutSession = await CartService.checkoutCart(cart?.id);
            stripe?.redirectToCheckout({
                sessionId: checkoutSession.sessionId,
            })
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.message,
                status: "Error"
            })
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
                    <Box p={2} paddingTop={5} sx={{
                        display: 'flex',
                        width: '100%',
                        margin: 'auto',
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
            <SnackBar state={snackbar} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} />
        </div>
    );
};

export default Cart;