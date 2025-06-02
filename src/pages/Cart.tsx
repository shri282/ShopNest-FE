import React, { useCallback, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSideDrawer from '../components/admin/AdminSideDrawer';
import ErrorSnackbar from '../common/ErrorSnackBar';
import Header from '../components/Header';
import CartService from '../services/CartService';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ICart } from '../interfaces/Cart';
import axios from 'axios';

const Cart: React.FC = () => {

    const { user } = useAuth();
    const [error, setError] = useState<any>(null);
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [cart, setCart] = React.useState<ICart | null>(null);

    const getUserCart = useCallback(async () => {
        if (!user?.id) return;
        setLoading(true);

        try {
            const cart: ICart = await CartService.getUserCart(user?.id);
            setCart(cart);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setCart(null);
            } else {
                setError(error);
                setErrorPopupOpen(true);
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    React.useEffect(() => {
        getUserCart();
    }, [getUserCart])

    return (
        <div className='user-dashboard'>
            <AdminSideDrawer Header={<Header />}>
                <Typography fontSize={23}>Your Shopping Cart</Typography>
                {
                    loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                }
                {
                    cart
                        ?
                        <Box>
                            {JSON.stringify(cart)}
                        </Box>
                        : !loading && <Box>cart not found</Box>
                }

            </AdminSideDrawer>
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </div>
    )
}

export default Cart