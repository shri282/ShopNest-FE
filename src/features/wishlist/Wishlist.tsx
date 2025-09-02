import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WishlistCard from './components/WishlistCard'

const wishlists = [
    {
        id: 1,
        product_id: 21,
        name: "bag",
        description: "ghjkgf dsshjk sdfjd dfsjdkd",
        offer_price: 453,
        price: 600
    },
    {
        id: 2,
        product_id: 21,
        name: "bag",
        description: "ghjkgf dsshjk sdfjd dfsjdkd",
        offer_price: 453,
        price: 600
    },
    {
        id: 3,
        product_id: 21,
        name: "bag",
        description: "ghjkgf dsshjk sdfjd dfsjdkd",
        offer_price: 453,
        price: 600
    }
]

function Wishlist() {
    return (
        <Box padding={2}>
            <Divider />
            <Box display={'flex'} p={1} justifyContent={'space-between'}>
                <Typography variant='h5'>Wishlist ({wishlists.length})</Typography>
                <Box>
                    <Button variant='outlined' sx={{
                        color: 'black',
                        fontWeight: 'bolder',
                        textTransform: "none",
                        border: '1.5px solid',
                        borderColor: "rgba(0, 0, 0, 0.1)",
                    }}>
                        <ShoppingCartOutlinedIcon sx={{ color: 'black', marginRight: '2px' }} />
                        Move all to Cart
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Grid mt={2} container spacing={2}>
                {
                    wishlists.map((item) =>
                        <Grid>
                            <WishlistCard item={item} />
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Wishlist