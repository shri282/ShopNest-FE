import React, { useCallback, useState } from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import { useUserCart } from './hooks/useUserCart';
import DataState from '../../common/DataState';
import OrderSummary from '../order/components/OrderSummary';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../../common/LoadingOverlay';
import ShoppingCartList from './components/ShoppingCartList';
import { useAuthContext } from '../../context/auth';
import { useCheckout } from './hooks/useCheckout';

const Cart: React.FC = () => {
    // context
    const { authContextSelector } = useAuthContext();
    const user = authContextSelector.getUser();
    
    // on mount
    const { cart, setCart, error, loading } = useUserCart(user?.id);
    const { handleCheckout } = useCheckout(cart?.id);

    // others
    const [isApiLoading, setIsApiLoading] = useState(false);
    const navigate = useNavigate();

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
        </div>
    );
};

export default Cart;