import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useState } from 'react';
import { IProduct } from '../../../interfaces/Product';
import { useNavigate } from 'react-router-dom';
import AddWishlistItemPopup from '../../wishlist/components/AddWishlistItemPopup';

interface FeaturedProductCardProps {
    product: IProduct
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const [openAddWlPopup, setOpenAddWlPopup] = useState<boolean>(false);

    const addToWlHandler = () => {
        setOpenAddWlPopup(true);
    }

    return (
        <Card
            key={product.id}
            sx={{
                borderRadius: "20px",
                p: 2,
                position: "relative",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                "&:hover": { transform: "translateY(-5px)", transition: "0.3s" },
            }}
        >
            {/* Tag */}
            <Box
                sx={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                    backgroundColor: "brown",
                    color: "white",
                    fontSize: "12px",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                }}
            >
                Sale
            </Box>

            {/* Wishlist Icon */}
            <IconButton onClick={addToWlHandler} sx={{ position: "absolute", top: 15, right: 15, color: "gray" }}>
                <FavoriteBorderIcon />
            </IconButton>

            {/* Product Image */}
            <CardMedia
                component="img"
                image={product.imageURL}
                alt={product.name}
                sx={{ height: 180, objectFit: "contain", mb: 2 }}
            />

            {/* Content */}
            <CardContent sx={{ textAlign: "left", px: 0 }}>
                <Typography sx={{ fontWeight: "500", fontSize: "16px", mb: 1 }}>
                    {product.name}
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold", mb: 1 }}>
                    ${product.prize}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "goldenrod" }}>
                    {"★".repeat(3)}
                </Typography>
            </CardContent>

            {/* Round CTA Button */}
            <Box
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                    backgroundColor: "black",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <ArrowForwardIcon sx={{ color: "white" }} />
            </Box>
            {openAddWlPopup && <AddWishlistItemPopup product={product} open={openAddWlPopup} onClose={() => setOpenAddWlPopup(false)} />}
        </Card>
    )
}

export default FeaturedProductCard