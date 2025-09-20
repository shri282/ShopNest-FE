import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { ICart } from '../../../interfaces/Cart';
import CartItemCard from './CartItemCard';

interface ShoppingCartListProps {
    setIsLoading: (flag: boolean) => void
    cart: ICart
    setCart: (cart: ICart) => void;
}

const ShoppingCartList: React.FC<ShoppingCartListProps> = ({ setIsLoading, cart, setCart }) => {

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

                {
                    cart.items.map((item, index) => 
                        <CartItemCard
                            key={index} 
                            item={item} 
                            setCart={setCart} 
                            setIsLoading={setIsLoading} 
                        />
                    )
                }
            </Box>
        </Box>
    )
}

export default ShoppingCartList;