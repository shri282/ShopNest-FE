import {
    Box,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedProductCard from "../../product/components/FeaturedProductCard";
import { IProduct } from "../../../interfaces/Product";
import ProductService from "../../../services/ProductService";

interface OurProductsProps {
    category: string | undefined;
}

const OurProducts: React.FC<OurProductsProps> = ({ category }) => {
    const [tab, setTab] = useState(0);
    const [filter, setFilter] = useState<any>();
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setFilter((prev: any) => {
            if (category) {
                return {
                    ...prev,
                    category: category
                }
            }

            return prev;
        })
    }, [tab, category])

    useEffect(() => {
        const fetchProductsByTab = async () => {
            try {
                const data = await ProductService.getProducts(filter);
                setProducts(data);
            } catch (error) {
                console.log("error in get products");
            }
        }

        fetchProductsByTab();
    }, [tab, filter]);
    
    return (
        <Box sx={{ px: 8, py: 6 }}>
            {/* Heading */}
            <Typography sx={{ color: "brown", fontSize: "14px", mb: 1 }}>
                Our Products
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
                    Top { category ? category : "Products" }
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