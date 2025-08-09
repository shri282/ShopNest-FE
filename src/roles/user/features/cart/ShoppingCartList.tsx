import { Box, Button, CardMedia, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ICart, ICartItem } from '../../../../interfaces/Cart';
import { useAuth } from '../../../../context/AuthContext';
import CartService from '../../../../services/CartService';
import InfoSnackbar from '../../../../common/InfoSnackBar';
import ErrorSnackbar from '../../../../common/ErrorSnackBar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import * as cartItemsCountTypes from '../../../../redux/cartItemsCount/types';

interface ShoppingCartListProps {
    setIsLoading: (flag: boolean) => void
    cart: ICart
    setCart: (cart: ICart) => void;
}

const ShoppingCartList: React.FC<ShoppingCartListProps> = ({ setIsLoading, cart, setCart }) => {

    const { user } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const [openInfoSnackBar, setOpenInfoSnackBar] = useState<boolean>(false);
    const [openErrorSnackBar, setOpenErrorSnackBar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const updateItemQuantityHandler = async (item: ICartItem, quantity: number) => {
        if (!user?.id) return;
        if (item.quantity + quantity === 0) return removeItem(item.id);
        setIsLoading(true);

        try {
            const updatedCart: ICart = await CartService.updateCartItemQuantity(user.id, item.id, quantity);
            setCart(updatedCart);
            setOpenInfoSnackBar(true);
            setMessage(`1 quantity ${quantity > 0 ? 'added' : 'removed'} successfully`);
        } catch (error: any) {
            console.log(error);
            setOpenErrorSnackBar(true);
            setMessage(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const removeItem = async (itemId: number) => {
        if (!user?.id) return
        setIsLoading(true);

        try {
            const updatedCart: ICart = await CartService.removeCartItem(user.id, itemId);
            dispatch({ type: cartItemsCountTypes.DECREMENT });
            setCart(updatedCart);
            setOpenInfoSnackBar(true);
            setMessage('item removed successfully');
        } catch (error: any) {
            console.log(error);
            setOpenErrorSnackBar(true);
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box mb={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Shopping Cart</Typography>
                <Typography variant="subtitle2">{cart.items.length} Items</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: 3, p: 1 }}>
                    <Box sx={{ alignSelf: 'center', fontWeight: 600 }}>Product Details</Box>
                    <Box sx={{ display: 'flex', fontWeight: 600 }}>
                        Quantity
                    </Box>
                    <Typography sx={{ marginRight: 10 }} fontWeight={600}>Total</Typography>
                </Box>

                <Divider />

                {cart.items.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid #eee',
                            mb: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* Product Image */}
                        <CardMedia
                            component="img"
                            image={item.imageURL}
                            alt={item.productName}
                            sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 1,
                            }}
                        />

                        {/* Product Info */}
                        <Box sx={{ flex: 1, minWidth: 200 }}>
                            <Typography fontWeight={500}>{item.productName}</Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: 12, color: item.availability ? 'green' : 'red', mt: 0.5 }}
                            >
                                {item.availability ? 'In stock' : 'Out of stock'}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 13, mt: 1, color: '#555' }}>
                                Unit Price: <b>₹{item.unitPrice.toFixed(2)}</b>
                            </Typography>
                        </Box>

                        {/* Quantity Controls */}
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => updateItemQuantityHandler(item, -1)}
                                sx={{ minWidth: 32, height: 32, fontSize: 18 }}
                            >
                                -
                            </Button>
                            <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 500 }}>
                                {item.quantity}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => updateItemQuantityHandler(item, 1)}
                                sx={{ minWidth: 32, height: 32, fontSize: 18 }}
                            >
                                +
                            </Button>
                        </Box>

                        {/* Total Price */}
                        <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                                ₹{(item.unitPrice * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>

                        {/* Remove Button */}
                        <Box
                            onClick={() => removeItem(item.id)}
                            sx={{
                                ml: 2,
                                color: '#d32f2f',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                transition: 'background 0.2s',
                                '&:hover': {
                                    backgroundColor: '#ffe6e6',
                                },
                            }}
                        >
                            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>×</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <InfoSnackbar open={openInfoSnackBar} message={message} onClose={() => setOpenInfoSnackBar(false)} />
            <ErrorSnackbar open={openErrorSnackBar} message={message} onClose={() => setOpenErrorSnackBar(false)} />
        </Box>
    )
}

export default ShoppingCartList;