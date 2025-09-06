import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { IWishlistItem } from "../../../interfaces/Cart";

interface WishlistCardProps {
    item: IWishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
    return (
        <Card
            key={item.id}
            sx={{
                position: "relative",
                border: "none",
                borderRadius: 3,
                backgroundColor: "#fafafa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                },
            }}
        >
            {/* Discount Tag */}
            <Box
                sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    backgroundColor: "brown",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                }}
            >
                10% off
            </Box>

            {/* Wishlist Icon */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    "&:hover": { bgcolor: "#f1f1f1" },
                }}
            >
                <FavoriteBorderIcon color="error" />
            </IconButton>

            {/* Product Image */}
            <CardMedia
                component="img"
                image={item.productImageUrl}
                alt={item.productName}
                sx={{
                    height: 180,
                    objectFit: "contain",
                    pt: 2,
                }}
            />

            {/* Product Details */}
            <CardContent sx={{ textAlign: "center", px: 2 }}>
                <Typography
                    sx={{ fontWeight: "bold", fontSize: "16px", mb: 0.5 }}
                    noWrap
                >
                    {item.productName}
                </Typography>
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        mb: 1,
                        minHeight: "36px",
                    }}
                >
                    {item.productDescription}
                </Typography>
                <Typography
                    sx={{ fontSize: "18px", fontWeight: "bold", color: "primary.main" }}
                >
                    ${item.productPrize}
                </Typography>
            </CardContent>

            {/* Add to Cart */}
            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                        textTransform: "none",
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    }}
                >
                    <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default WishlistCard;