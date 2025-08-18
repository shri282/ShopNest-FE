import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import FeaturedProductCard from "../../product/components/FeaturedProductCard";
import { IProduct } from "../../../interfaces/Product";

const products: IProduct[] = [
    {
        id: 1,
        name: "Coach Pillows Sofa",
        prize: 730,
        quantity: 10,
        availability: true,
        brand: "ComfortLine",
        categoryId: 1,
        categoryName: "Sofa",
        description: "A stylish modern sofa with plush cushions for maximum comfort.",
        imageType: "jpg",
        imageName: "coach-pillows-sofa",
        imageURL: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg",
    },
    {
        id: 2,
        name: "Muse Classical Chair",
        prize: 420,
        quantity: 15,
        availability: true,
        brand: "HeritageWood",
        categoryId: 2,
        categoryName: "Chair",
        description: "Elegant wooden classical chair with soft fabric upholstery.",
        imageType: "jpg",
        imageName: "muse-classical-chair",
        imageURL: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg",
    },
    {
        id: 3,
        name: "Bedroom Furniture Set",
        prize: 710,
        quantity: 5,
        availability: true,
        brand: "DreamSpace",
        categoryId: 3,
        categoryName: "Bedroom",
        description: "Complete bedroom furniture set including bed, side tables, and wardrobe.",
        imageType: "jpg",
        imageName: "bedroom-furniture-set",
        imageURL: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg",
    }
];

function NewArrivals() {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 8, py: 6 }}>

            {/* LEFT SIDE - TEXT */}
            <Box sx={{ maxWidth: "350px" }}>
                <Typography sx={{ color: "brown", fontSize: "14px", mb: 1 }}>
                    New Arrival
                </Typography>
                <Typography sx={{ fontSize: "32px", fontWeight: "bold", mb: 2, lineHeight: 1.2 }}>
                    Discover Our Latest Arrivals
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "15px", mb: 4 }}>
                    Exciting new furniture is here! Don’t miss out on the newest trends and
                    unique pieces added to our collection. Shop the latest now.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                        borderRadius: "30px",
                        px: 4,
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: "500",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                    endIcon={<ArrowForwardIcon />}
                >
                    See All Products
                </Button>
            </Box>

            {/* RIGHT SIDE - PRODUCT CARDS */}
            <Box sx={{ display: "flex", gap: 4 }}>
                {products.map((product) => (
                    <FeaturedProductCard product={product} />
                ))}
            </Box>
        </Box>
    );
}

export default NewArrivals;