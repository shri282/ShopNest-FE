import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IProductCategory } from "../../../interfaces/Product";
import ProductService from "../../../services/ProductService";

interface ShopByCategoryProps {
    setSelectedCategory: (category: string) => void;
}

const ShopByCategory: React.FC<ShopByCategoryProps> = ({ setSelectedCategory }) => {
    const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const productCategoriesResp = await ProductService.getProductsCategories();
                setProductCategories(productCategoriesResp);
            } catch {
                console.log("error in product categories");
            }
        }

        fetchProductCategories();
    }, []);

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
                            cursor: 'pointer'
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
        </Box>
    );
}

export default ShopByCategory;