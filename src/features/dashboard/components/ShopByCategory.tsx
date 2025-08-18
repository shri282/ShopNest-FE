import { Box, Typography, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IProductCategory } from "../../../interfaces/Product";
import ProductService from "../../../services/ProductService";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface ShopByCategoryProps {
    setSelectedCategory: (category: string) => void;
}

const ShopByCategory: React.FC<ShopByCategoryProps> = ({ setSelectedCategory }) => {
    const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const productCategoriesResp = await ProductService.getProductsCategories();
                setProductCategories(productCategoriesResp);
            } catch {
                console.log("error in product categories");
            }
        };
        fetchProductCategories();
    }, []);

    // Scroll function
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 200; // adjust how much to scroll
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

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

            {/* Wrapper with arrows */}
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                {/* Left arrow */}
                <IconButton onClick={() => scroll("left")}>
                    <ArrowBackIos />
                </IconButton>

                {/* Scrollable categories */}
                <Box
                    ref={scrollRef}
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        gap: 4,
                        flex: 1,
                        "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
                    }}
                >
                    {productCategories.map((cat, index) => (
                        <Box
                            key={index}
                            onClick={() => setSelectedCategory(cat.name)}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                width: "150px",
                                flexGrow: 1,
                                cursor: "pointer",
                                flexShrink: 0,
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
                                    style={{ width: "100%", objectFit: "cover" }}
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                />
                            </Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                                {cat.name}
                            </Typography>
                            <Typography sx={{ fontSize: "14px", color: "gray" }}>
                                12 Products
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Right arrow */}
                <IconButton onClick={() => scroll("right")}>
                    <ArrowForwardIos />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ShopByCategory;
