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
    Modal
} from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { IWishlistSummary } from '../../../interfaces/Cart'
import CartService from '../../../services/CartService'

interface AddWishlistItemFormProps {
    product: IProduct
    open: boolean
    onClose: () => void
}

const AddWishlistItemPopup: React.FC<AddWishlistItemFormProps> = ({ product, open, onClose }) => {
    const [wishlistsSummary, setWishlistsSummary] = useState<IWishlistSummary[]>([]);
    const [note, setNote] = useState('');
    const [priority, setPriority] = useState('3');
    const [wishlistId, setWishlistId] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const getAllWishlistSummary = async () => {
            if (!user) return;

            try {
                const wishlistSummary = await CartService.getAllWishlistSummary(user.id);
                setWishlistsSummary(wishlistSummary);
            } catch (error) {
                console.log(error);
            }
        }

        if (open) {
            getAllWishlistSummary();
        }
    }, [user, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ productId: product.id, note, priority, wishlistId });
        onClose(); // close popup after submit
    }

    return (
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

                    {/* Priority */}
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

                        {/* Wishlist Dropdown */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Wishlist</InputLabel>
                            <Select
                                size="small"
                                value={wishlistId}
                                onChange={(e) => setWishlistId(e.target.value)}
                                label="Wishlist"
                            >
                                {wishlistsSummary.map((wishlist) => (
                                    <MenuItem key={wishlist.id} value={wishlist.id}>
                                        {wishlist.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default AddWishlistItemPopup;