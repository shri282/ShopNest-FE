import { Box, Typography, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IProductCategory } from "../../../interfaces/Product";
import ProductService from "../../../services/ProductService";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import DataState from "../../../common/DataState";
import ErrorSnackbar from "../../../common/ErrorSnackBar";

interface ShopByCategoryProps {
    setSelectedCategory: (category: string) => void;
}

const ShopByCategory: React.FC<ShopByCategoryProps> = ({ setSelectedCategory }) => {
    const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchProductCategories = async () => {
            setLoading(true);
            
            try {
                const productCategoriesResp = await ProductService.getProductsCategories();
                setProductCategories(productCategoriesResp);
            } catch (error: any) {
                setError(error);
                setErrorPopupOpen(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProductCategories();
    }, []);

    // Check for overflow & update arrow visibility
    const updateArrows = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    // Run when scroll happens
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateArrows(); // initial check

        el.addEventListener("scroll", updateArrows);
        window.addEventListener("resize", updateArrows);

        return () => {
            el.removeEventListener("scroll", updateArrows);
            window.removeEventListener("resize", updateArrows);
        };
    }, [productCategories]);

    // Scroll function
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 200;
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
            <DataState
                data={productCategories}
                error={error}
                loaderStyle={{ height: '50px' }}
                loading={loading}
                render={(productCategories) =>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        {/* Left arrow */}
                        {showLeftArrow && (
                            <IconButton onClick={() => scroll("left")}>
                                <ArrowBackIos />
                            </IconButton>
                        )}

                        {/* Scrollable categories */}
                        <Box
                            ref={scrollRef}
                            sx={{
                                display: "flex",
                                overflowX: "auto",
                                scrollBehavior: "smooth",
                                gap: 4,
                                flex: 1,
                                "&::-webkit-scrollbar": { display: "none" },
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
                        {showRightArrow && (
                            <IconButton onClick={() => scroll("right")}>
                                <ArrowForwardIos />
                            </IconButton>
                        )}
                    </Box>
                }
            />
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </Box>
    );
};

export default ShopByCategory;