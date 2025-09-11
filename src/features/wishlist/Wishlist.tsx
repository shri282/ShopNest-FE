import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import WishlistCard from './components/WishlistCard'
import { IWishlistDetail, IWishlistItem } from '../../interfaces/Cart'
import CartService from '../../services/CartService'
import { useAuth } from '../../context/AuthContext'
import DataState from '../../common/DataState'
import ErrorSnackbar from '../../common/ErrorSnackBar'

const Wishlist = () => {
    const { user } = useAuth()
    const [wishlist, setWishlist] = useState<IWishlistDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [errorPopupOpen, setErrorPopupOpen] = useState(false)

    useEffect(() => {
        const getDefaultWishlist = async () => {
            if (!user) return
            setLoading(true)

            try {
                const wishlistData = await CartService.getDefaultWishlist(user.id)
                setWishlist(wishlistData)
            } catch (err) {
                setError(err)
                setErrorPopupOpen(true)
            } finally {
                setLoading(false)
            }
        }

        getDefaultWishlist()
    }, [user])

    return (
        <Box padding={2}>
            <DataState
                data={wishlist}
                error={error}
                loading={loading}
                render={(wishlist: IWishlistDetail) => (
                    <>
                        <Divider />
                        <Box display="flex" p={1} justifyContent="space-between">
                            <Typography variant="h5">
                                Wishlist ({wishlist?.wishlistItems.length})
                            </Typography>
                            <Box>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bolder',
                                        textTransform: 'none',
                                        border: '1.5px solid',
                                        borderColor: 'rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <ShoppingCartOutlinedIcon
                                        sx={{ color: 'black', marginRight: '2px' }}
                                    />
                                    Move all to Cart
                                </Button>
                            </Box>
                        </Box>
                        <Divider />
                        <Grid mt={2} container spacing={2}>
                            {wishlist?.wishlistItems.map((item: IWishlistItem) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                                    <WishlistCard item={item} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            />

            <ErrorSnackbar
                open={errorPopupOpen}
                message={error?.message}
                onClose={() => setErrorPopupOpen(false)}
            />
        </Box>
    )
}

export default Wishlist;