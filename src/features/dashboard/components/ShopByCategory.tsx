import { Box, Typography } from "@mui/material";
import React from "react";

const categories = [
    { name: "Bedroom", products: 16, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
    { name: "Bathroom", products: 8, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
    { name: "Dining Room", products: 7, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
    { name: "Chair", products: 24, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
    { name: "Sofa", products: 14, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
    { name: "Kitchen", products: 12, img: "images/jakob-owens-O_bhy3TnSYU-unsplash.jpg" },
];

function ShopByCategory() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "50px",
            }}
        >
            {/* Heading */}
            <Typography sx={{ color: "brown", fontSize: "14px", mb: 1 }}>
                Shop by Category
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: "bold", mb: 5 }}>
                Find What You Need
            </Typography>

            {/* Category List */}
            <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                {categories.map((cat, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            width: "150px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 2,
                                border: "1px solid #eee",
                            }}
                        >
                            <img
                                style={{ width: '100%', objectFit:'cover' }}
                                src={cat.img}
                                alt={cat.name}
                            />
                        </Box>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            {cat.name}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "gray" }}>
                            {cat.products} Products
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ShopByCategory;