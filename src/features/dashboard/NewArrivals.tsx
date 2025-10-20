import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/Product";
import ProductService from "../../services/ProductService";
import DataState from "../../common/DataState";
import ErrorSnackbar from "../../common/ErrorSnackBar";
import FeaturedProductCard from "../product/FeaturedProductCard";

function NewArrivals() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);

    
    useEffect(() => {
        const fetchProductsByTab = async () => {
            setLoading(true);

            try {
                const data = await ProductService.getProducts({ newArrivals: true });
                setProducts(data);
            } catch (error: any) {
                setError(error);
                setErrorPopupOpen(true);
            } finally {
                setLoading(false);
            }
        }

        fetchProductsByTab();
    }, []);

    return (
        <Box
            paddingTop={10}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >

            {/* LEFT SIDE - TEXT */}
            <Box sx={{ maxWidth: "350px" }}>
                <Typography sx={{ color: "brown", fontSize: "14px", mb: 1 }}>
                    New Arrival
                </Typography>
                <Typography sx={{ fontSize: "32px", fontWeight: "bold", mb: 2, lineHeight: 1.2 }}>
                    Discover Our Latest Arrivals
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "15px", mb: 4 }}>
                    Exciting new products is here! Don’t miss out on the newest trends and
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
            <DataState
                data={products}
                error={error}
                loaderStyle={{ width: '500px', height: '250px' }}
                loading={loading}
                render={(products: IProduct[]) =>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        {products.map((product) => (
                            <FeaturedProductCard product={product} />
                        ))}
                    </Box>
                }
            />

            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </Box>
    );
}

export default NewArrivals;