import React, { useCallback, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSideDrawer from '../components/admin/AdminSideDrawer';
import ErrorSnackbar from '../common/ErrorSnackBar';
import Header from '../components/Header';
import CartService from '../services/CartService';

const Cart: React.FC = () => {

    const { user } = useAuth();
    const [error, setError] = useState<any>(null);
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [cart, setCart] = React.useState<any>(null);

    const getUserCart = useCallback(async () => {
        if (!user?.id) return;
        try {
            const cart = await CartService.getUserCart(user?.id);
            setCart(cart);
        } catch (error) {
            console.log(error);
            setError(error);
            setErrorPopupOpen(true);
        }
    }, [user]);

    React.useEffect(() => {
        getUserCart();
    }, [getUserCart])

  return (
    <div className='user-dashboard'>
        <AdminSideDrawer Header={<Header />}>
            {
                JSON.stringify(cart)
            }
        </AdminSideDrawer>
        <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
    </div>
  )
}

export default Cart