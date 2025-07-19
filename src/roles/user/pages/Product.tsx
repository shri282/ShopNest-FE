import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IProduct } from '../../../interfaces/Product';
import FallBackWrapper from '../../../common/FallBackWrapper';
import ProductService from '../../../services/ProductService';
import "../css/product.css";
import { Button, Chip, Rating, Skeleton, Typography } from '@mui/material';
import { ShoppingCart, FavoriteBorder, Favorite, StarBorder } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import UpdateProductPopup from '../../seller/components/UpdateProductPopup';
import { useAuth } from '../../../context/AuthContext';
import CartService from '../../../services/CartService';
import InfoSnackbar from '../../../common/InfoSnackBar';
import ErrorSnackbar from '../../../common/ErrorSnackBar';

const Product = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [isAddingCartInProgress, setIsAddingCartInProgress] = useState(false);
    const [openInfoSnackBar, setOpenInfoSnackBar] = useState<boolean>(false);
    const [openErrorSnackBar, setOpenErrorSnackBar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [updatePopupOpen, setUpdatePopupOpen] = useState<boolean>(false);
    const theme = useTheme();

    const getProduct = useCallback(async () => {
        try {
            const productObj = await ProductService.getProduct(Number(id));
            setProduct(productObj);
        } catch (error) {
            console.log(error);
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
            setOpenInfoSnackBar(true);
            setMessage("cart added successfully");
        } catch (error: any) {
            console.log(error);
            setOpenErrorSnackBar(true);
            setMessage(error.message);
        } finally {
            setIsAddingCartInProgress(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        getProduct();
    }, [id, getProduct])

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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <FallBackWrapper
                fallback={() => !Boolean(product)}
                fallbackComponent={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                        padding: '50px 50px'
                    }}>
                        <div style={{ width: '100%', maxWidth: '1200px' }}>
                            <Skeleton variant="rectangular" width="100%" height={400} />
                        </div>
                    </div>
                }
            >
                {
                    product && (
                        <div className="prod-container">
                            <div className="img-div">
                                <img
                                    className='prod-img'
                                    src={product.imageURL}
                                    alt={product.name}
                                    loading="lazy"
                                />
                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '20px',
                                    justifyContent: 'center'
                                }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} style={{
                                            width: '80px',
                                            height: '80px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <img
                                                src={product.imageURL}
                                                alt={`Thumbnail ${i}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="product-details">
                                <Chip
                                    label={product.brand}
                                    color="primary"
                                    size="medium"
                                    style={{ marginBottom: '16px' }}
                                />

                                <Typography variant="h4" component="h1" gutterBottom>
                                    {product.name}
                                </Typography>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <Rating
                                        value={4.5}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={<StarBorder fontSize="inherit" />}
                                    />
                                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px' }}>
                                        (24 reviews)
                                    </Typography>
                                </div>

                                <Typography variant="h5" component="div" gutterBottom style={{ marginBottom: '0px', color: theme.palette.primary.main }}>
                                    {formatPrice(product.prize)}
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        style={{
                                            textDecoration: 'line-through',
                                            color: '#999',
                                            marginLeft: '8px',
                                        }}
                                    >
                                        {formatPrice(100)}
                                    </Typography>
                                </Typography>
                                <p style={{ marginTop: '0px', fontSize: '14px' }}>(16 % off)</p>

                                <Typography variant="body1" style={{ marginBottom: '24px' }}>
                                    {product.description}
                                </Typography>

                                <div style={{ marginBottom: '24px' }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Specifications:
                                    </Typography>
                                    <ul style={{
                                        paddingLeft: '20px',
                                        margin: 0,
                                        color: '#555'
                                    }}>
                                        <li>Material: High-quality fabric</li>
                                        <li>Dimensions: 10 x 5 x 3 inches</li>
                                        <li>Weight: 0.5 kg</li>
                                        <li>Color: Black</li>
                                    </ul>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '16px',
                                    marginBottom: '24px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="subtitle1" style={{ marginRight: '8px' }}>
                                            Quantity:
                                        </Typography>
                                        <select
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                border: '1px solid #ddd'
                                            }}
                                        >
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {product.quantity < 1000 && (
                                        <Typography variant="body2" color="error">
                                            Only {product.quantity} left in stock - order soon!
                                        </Typography>
                                    )}
                                </div>

                                {!product.availability ? (
                                    <Typography variant="h6" color="error" gutterBottom>
                                        Currently out of stock
                                    </Typography>
                                ) : (
                                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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

                                        <StyledButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            startIcon={isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                            size="large"
                                        >
                                            {isFavorite ? 'Saved' : 'Save'}
                                        </StyledButton>

                                    </div>
                                )}

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => setUpdatePopupOpen(true)}
                                    style={{ marginTop: '10px', textTransform: 'none' }}
                                >
                                    Update
                                </Button>

                                <div style={{
                                    marginTop: '32px',
                                    padding: '16px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px'
                                }}>
                                    <Typography variant="body2">
                                        <strong>Free shipping</strong> on orders over $50.
                                        <strong> 30-day</strong> returns.
                                        <strong> 24/7</strong> customer support.
                                    </Typography>
                                </div>
                            </div>
                            <div className='prod-popups'>
                                {updatePopupOpen && <UpdateProductPopup onUpdated={(product) => setProduct(product)} open={updatePopupOpen} setOpen={setUpdatePopupOpen} product={product} />}
                            </div>
                        </div>
                    )
                }
                <InfoSnackbar open={openInfoSnackBar} message={message} onClose={() => setOpenInfoSnackBar(false)} />
                <ErrorSnackbar open={openErrorSnackBar} message={message} onClose={() => setOpenErrorSnackBar(false)} />
            </FallBackWrapper>
        </div>
    )
}

export default Product