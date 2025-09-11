import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../interfaces/Product'
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Modal,
    LinearProgress,
} from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { IWishlistSummary } from '../../../interfaces/Cart'
import CartService from '../../../services/CartService'
import { useNavigate } from 'react-router-dom'
import { ISnackbarState } from '../../../common/types'
import SnackBar from '../../../common/SnackBar'

interface AddWishlistItemFormProps {
    product: IProduct
    open: boolean
    onClose: () => void
}

const AddWishlistItemPopup: React.FC<AddWishlistItemFormProps> = ({ product, open, onClose }) => {
    const navigate = useNavigate();

    const [wishlistsSummary, setWishlistsSummary] = useState<IWishlistSummary[]>([])

    const [wishlistId, setWishlistId] = useState<string | undefined>(undefined)
    const [note, setNote] = useState('')
    const [priority, setPriority] = useState('3')

    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState<ISnackbarState>({
        open: false,
        message: "",
        status: "Info"
    });

    const { user } = useAuth()

    useEffect(() => {
        const getAllWishlistSummary = async () => {
            if (!user) return navigate("login");

            setLoading(true)
            try {
                const wishlistSummaryData: IWishlistSummary[] =
                    await CartService.getAllWishlistSummary(user.id)

                setWishlistsSummary(wishlistSummaryData)

                if (wishlistSummaryData.length) {
                    const defaultWishlist = wishlistSummaryData.find((w) => w.default)
                    if (defaultWishlist) {
                        setWishlistId(defaultWishlist.id.toString())
                    }
                }
            } catch (error: any) {
                setSnackbar({
                    open: true,
                    message: error.message,
                    status: "Error"
                })
            } finally {
                setLoading(false)
            }
        }

        if (open) {
            getAllWishlistSummary()
        }
    }, [user, open, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        if (!user) return navigate("login");

        setLoading(true)
        try {
            const req: any = {
                productId: product.id,
                notes: note,
                priority: Number(priority),
            }

            if (wishlistId) req.wishlistId = Number(wishlistId);

            await CartService.addItemToWishlist(user.id, req);
            setSnackbar({
                open: true,
                message: 'item added to wishlist successfully',
                status: "Info"
            })
            setTimeout(() => onClose(), 1500);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.message,
                status: "Error"
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="wishlist-modal-title"
                aria-describedby="wishlist-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: 450,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Typography id="wishlist-modal-title" variant="h6" gutterBottom>
                        Add Product to Wishlist
                    </Typography>

                    {loading && <LinearProgress sx={{ mb: 2 }} />}

                    {!loading && (
                        <form onSubmit={handleSubmit}>
                            {/* Note */}
                            <TextField
                                fullWidth
                                label="Note"
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />

                            {/* Priority & Wishlist */}
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={priority}
                                        size="small"
                                        onChange={(e) => setPriority(e.target.value)}
                                        label="Priority"
                                    >
                                        <MenuItem value="1">High</MenuItem>
                                        <MenuItem value="2">Medium</MenuItem>
                                        <MenuItem value="3">Low</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Wishlist</InputLabel>
                                    <Select
                                        size="small"
                                        value={wishlistId ?? ''}
                                        onChange={(e) => setWishlistId(e.target.value)}
                                        label="Wishlist"
                                    >
                                        {wishlistsSummary.map((wishlist) => (
                                            <MenuItem key={wishlist.id} value={wishlist.id.toString()}>
                                                {wishlist.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                <Button variant="outlined" color="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Add
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Modal>

            {/* Snackbar */}
            <SnackBar state={snackbar} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} />
        </>
    )
}

export default AddWishlistItemPopup;