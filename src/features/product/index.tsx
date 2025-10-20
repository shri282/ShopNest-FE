import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../../css/product.css"
import { Box, Button, Chip, List, ListItem, ListItemText, MenuItem, Paper, Rating, Select, Stack, Typography } from '@mui/material';
import { ShoppingCart, FavoriteBorder, Favorite, StarBorder } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { IProduct } from '../../interfaces/Product';
import ProductService from '../../services/ProductService';
import CartService from '../../services/CartService';
import UpdateProductPopup from '../../components/UpdateProductPopup';
import * as cartItemsCountTypes from "../../redux/cartItemsCount/types"
import DataState from '../../common/DataState';
import styled from '@emotion/styled';
import ProductReviewStats from './ProductReviewStats';
import SnackBar from '../../common/SnackBar';
import { ISnackbarState } from '../../common/types';
import { useAuthContext } from '../../context/auth';
import ProductPageSkeletonLoader from '../../components/loaders/ProductPageSkeletonLoader';
import WriteReview from './WriteReview';
import CustomerReviews from './CustomerReviews';


const StyledButton = styled(Button)({
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-1px)'
    }
});

const Product = () => {
    // Data state
    const [product, setProduct] = useState<IProduct | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Auth / User context state
    const { authContextSelector } = useAuthContext();
    const user = authContextSelector.getUser();

    // Global state (Redux)
    const dispatch = useDispatch<AppDispatch>();

    // UI interaction state
    const [isAddingCartInProgress, setIsAddingCartInProgress] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

    // Routing params / navigation
    const { id } = useParams();
    const navigate = useNavigate();

    // Popup / Dialog state
    const [updatePopupOpen, setUpdatePopupOpen] = useState<boolean>(false);

    // Feedback / Notifications
    const [snackbar, setSnackbar] = useState<ISnackbarState>({
        open: false,
        message: "",
        status: "Info"
    });


    const getProduct = useCallback(async () => {
        setLoading(true);

        try {
            const productObj = await ProductService.getProduct(Number(id));
            setProduct(productObj);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [id])

    const addToCartHandler = async () => {
        if (!user?.id) return navigate("/login");
        if (!product) {
            return;
        }
        setIsAddingCartInProgress(true);

        try {
            await CartService.addItemToCart(user.id, product);
            dispatch({ type: cartItemsCountTypes.INCREMENT })
            setSnackbar({
                open: true,
                message: "cart added successfully",
                status: "Info"
            })
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.message,
                status: "Error"
            })
        } finally {
            setIsAddingCartInProgress(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        getProduct();
    }, [id, getProduct])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <DataState
            data={product}
            error={error}
            loaderStyle={{ width: '100%', height: '100%' }}
            loading={loading}
            loader={<ProductPageSkeletonLoader />}
            render={(product) =>
                <Box p={2} paddingTop={5}>
                    { /* Product container */}
                    <Box className="prod-container" display="flex" gap={4}>
                        {/* Left - Images */}
                        <Box className="img-div">
                            <Box
                                component="img"
                                src={product.imageURL}
                                alt={product.name}
                                loading="lazy"
                                sx={{ width: "100%", borderRadius: 2 }}
                            />

                            {/* Thumbnails */}
                            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                                {[1, 2, 3, 4].map((i) => (
                                    <Paper
                                        key={i}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            border: "1px solid #ddd",
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.imageURL}
                                            alt={`Thumbnail ${i}`}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>

                        {/* Right - Details */}
                        <Box className="product-details" flex={1}>

                            <Chip label={product.brand} color="primary" sx={{ mb: 2 }} />

                            <Typography variant="h4" component="h1" gutterBottom>
                                {product.name}
                            </Typography>

                            <Stack direction="row" alignItems="center" mb={2}>
                                <Rating
                                    value={4.5}
                                    precision={0.5}
                                    readOnly
                                    emptyIcon={<StarBorder fontSize="inherit" />}
                                />
                                <Typography variant="body2" color="text.secondary" ml={1}>
                                    (24 reviews)
                                </Typography>
                            </Stack>

                            <Typography variant="h5" gutterBottom sx={{ color: "primary.main", mb: 0 }}>
                                {formatPrice(product.prize)}
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                        ml: 1
                                    }}
                                >
                                    {formatPrice(100)}
                                </Typography>
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0 }}>
                                (16 % off)
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {product.description}
                            </Typography>

                            {/* Specifications */}
                            <Box mb={3}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Specifications:
                                </Typography>
                                <List dense sx={{ pl: 2 }}>
                                    <ListItem><ListItemText primary="Material: High-quality fabric" /></ListItem>
                                    <ListItem><ListItemText primary="Dimensions: 10 x 5 x 3 inches" /></ListItem>
                                    <ListItem><ListItemText primary="Weight: 0.5 kg" /></ListItem>
                                    <ListItem><ListItemText primary="Color: Black" /></ListItem>
                                </List>
                            </Box>

                            {/* Quantity & Stock */}
                            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="subtitle1" mr={1}>
                                        Quantity:
                                    </Typography>
                                    <Select
                                        defaultValue={1}
                                        size="small"
                                        sx={{ minWidth: 80 }}
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <MenuItem key={num} value={num}>{num}</MenuItem>
                                        ))}
                                    </Select>
                                </Stack>

                                {product.quantity < 1000 && (
                                    <Typography variant="body2" color="error">
                                        Only {product.quantity} left in stock - order soon!
                                    </Typography>
                                )}
                            </Stack>

                            {/* Availability */}
                            {!product.availability ? (
                                <Typography variant="h6" color="error" gutterBottom>
                                    Currently out of stock
                                </Typography>
                            ) : (
                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        onClick={addToCartHandler}
                                        startIcon={<ShoppingCart />}
                                        loading={isAddingCartInProgress}
                                        loadingPosition="end"
                                        size="large"
                                    >
                                        {isAddingCartInProgress ? "Adding..." : "Add to Cart"}
                                    </StyledButton>

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        startIcon={isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                        size="large"
                                    >
                                        {isFavorite ? "Saved" : "Save"}
                                    </Button>
                                </Stack>
                            )}

                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => setUpdatePopupOpen(true)}
                                sx={{ mt: 2, textTransform: "none" }}
                            >
                                Update
                            </Button>

                            {/* Extra Info */}
                            <Paper sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                                <Typography variant="body2">
                                    <strong>Free shipping</strong> on orders over $50.
                                    <strong> 30-day</strong> returns.
                                    <strong> 24/7</strong> customer support.
                                </Typography>
                            </Paper>
                        </Box>

                        {/* Popups */}
                        <Box className="prod-popups">
                            {updatePopupOpen && (
                                <UpdateProductPopup
                                    onUpdated={(product) => setProduct(product)}
                                    open={updatePopupOpen}
                                    setOpen={setUpdatePopupOpen}
                                    product={product}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Product reviews */}
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                            mt: 10,
                        }}
                    >
                        {/* Left - Write Review */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 350, gap: 3, maxWidth: 500 }}>
                            <ProductReviewStats productId={product.id} reviewSubmitted={reviewSubmitted} />
                            <WriteReview product={product} onReviewSubmit={() => setReviewSubmitted(!reviewSubmitted)} />
                        </Box>

                        {/* Right - Customer Reviews */}
                        <Box
                            sx={{
                                flex: 2,
                                minWidth: 400,
                                maxHeight: 600,
                                overflowY: 'auto',
                                p: 1,
                                borderRadius: 2,
                            }}
                        >
                            <CustomerReviews productId={product.id} reviewSubmitted={reviewSubmitted} />
                        </Box>
                    </Box>

                    <SnackBar state={snackbar} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} />
                </Box>
            }
        />
    )
}

export default Product