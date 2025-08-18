import {
    Box,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import React, { useState } from "react";
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
        imageURL: "images/sofa-coach-pillows.jpg",
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
        imageURL: "images/muse-classical-chair.jpg",
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
        imageURL: "images/bedroom-furniture-set.jpg",
    },
    {
        id: 4,
        name: "Egg Garden Chair",
        prize: 230,
        quantity: 20,
        availability: true,
        brand: "GardenEase",
        categoryId: 2,
        categoryName: "Chair",
        description: "Comfortable egg-shaped hanging chair, perfect for outdoor relaxation.",
        imageType: "jpg",
        imageName: "egg-garden-chair",
        imageURL: "images/egg-garden-chair.jpg",
    },
    {
        id: 5,
        name: "Office Desk",
        prize: 520,
        quantity: 8,
        availability: true,
        brand: "WorkSmart",
        categoryId: 4,
        categoryName: "Office",
        description: "Spacious office desk with drawers, designed for productivity and style.",
        imageType: "jpg",
        imageName: "office-desk",
        imageURL: "images/office-desk.jpg",
    },
];

function OurProducts() {
    const [tab, setTab] = useState(0);

    return (
        <Box sx={{ px: 8, py: 6 }}>
            {/* Heading */}
            <Typography sx={{ color: "brown", fontSize: "14px", mb: 1 }}>
                Our Products
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
                    Best Modern Furniture
                </Typography>

                {/* Tabs */}
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { background: "brown" } }}
                >
                    <Tab label="All Products" sx={{ textTransform: "none", fontWeight: tab === 0 ? "bold" : "400" }} />
                    <Tab label="New Arrivals" sx={{ textTransform: "none" }} />
                    <Tab label="Best Sellers" sx={{ textTransform: "none" }} />
                    <Tab label="Sale Items" sx={{ textTransform: "none" }} />
                </Tabs>
            </Box>

            {/* Product Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 4,
                }}
            >
                {products.map((product) => (
                    <FeaturedProductCard product={product} />
                ))}
            </Box>
        </Box>
    );
}

export default OurProducts;