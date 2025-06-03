import { Box, Button, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import { ICart, ICartItem } from '../../interfaces/Cart'
import CartService from '../../services/CartService';
import { useAuth } from '../../context/AuthContext';

interface ShoppingCartListProps {
    cart: ICart
    setCart: (cart: ICart) => void;
}

const ShoppingCartList: React.FC<ShoppingCartListProps> = ({ cart, setCart }) => {

    const { user } = useAuth();

    // const updateItemQuantityHandler = async (itemId: number, quantity: number) => {
    //     if (!user?.id) return;
    //     if (quantity < 1) return removeItem(itemId);

    //     try {
    //         const updatedCart = await CartService.updateCartItemQuantity(user.id, itemId, quantity);
    //         setCart(updatedCart);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const removeItem = (itemId: number) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <Box sx={{ width: '100%' }}>
            <Box mb={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Shopping Cart</Typography>
                <Typography variant="subtitle2">{cart.items.length} Items</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>

                <Box sx={{ display: 'flex', gap: 3, px: 1 }}>
                    <Box sx={{ width: '45%', alignSelf: 'center', fontWeight: 600 }}>Product Details</Box>
                    <Box sx={{ display: 'flex', width: '90px', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                        Quantity
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, fontWeight: 600 }}>
                        <Typography fontWeight={600}>Price</Typography>
                        <Typography fontWeight={600}>Total</Typography>
                    </Box>
                </Box>

                <Divider />

                {cart.items.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 3, p: 1 }}>
                        <Box sx={{ width: '45%', display: 'flex', alignItems: 'center' }}>
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

                        <Box sx={{ width: 'fit-content', display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={() => updateItemQuantityHandler(item.id, -1)}
                                sx={{
                                    minWidth: '20px',
                                    width: '20px',
                                    height: '20px',
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
                                    minWidth: 22,
                                    width: '22px',
                                    textAlign: 'center'
                                }}
                            >
                                {item.quantity}
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={() => updateItemQuantityHandler(item.id, 1)}
                                sx={{
                                    minWidth: '20px',
                                    width: '20px',
                                    height: '20px',
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
        </Box>
    )
}

export default ShoppingCartList;