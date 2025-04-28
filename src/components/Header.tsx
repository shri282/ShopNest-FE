import React, { useCallback, useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './css/header.css';
import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { IProduct } from '../interfaces/Product';
import { useThrottle } from '../hooks/useThrottle';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [field, setField] = useState<String>("all");
    const [keyword, setKeyword] = useState<String>("");
    const throttledKeyword = useThrottle(keyword, 500);
    const [searchResults, setSearchResults] = useState<Map<String, IProduct[]>>(new Map());

    const searchProducts = useCallback(async () => {
        if (!throttledKeyword.trim()) return;

        const products = await ProductService.searchProducts(field, keyword);
        const searchRes = ProductService.mapProductToSearchResults(field as string, keyword as string, products);
        setSearchResults(searchRes);
    }, [field, throttledKeyword]);

    useEffect(() => {
        searchProducts()
    }, [searchProducts])

    return (
        <header className="header">
            <div className="header__left">
                <img onClick={() => navigate("/")} className="header__logo" src="/images/logo192.png" alt="Logo" />
                <div className="header__location">
                    <LocationOnOutlinedIcon className="header__location-icon" />
                    <div className="header__location-text">
                        <span className="header__location-line1">Delivering to Chennai 600099</span>
                        <span className="header__location-line2">Update location</span>
                    </div>
                </div>
            </div>

            <div className="header__search">
                <Select
                    className="header__search-category"
                    variant="filled"
                    displayEmpty
                    value={field}
                    onChange={(e) => setField(e.target.value as string)}
                >
                    <MenuItem value="all"><em>All</em></MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="brand">Brand</MenuItem>
                </Select>
                <input onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search Amazon.in" className="header__search-input" />
            </div>

            <div className="header__right">
                <div className="header__auth">
                    <a href="/login" className="header__link">Sign in</a>
                    <span className="header__separator">|</span>
                    <a href="/register" className="header__link">Register</a>
                </div>
                <div className="header__cart">
                    <ShoppingCartOutlinedIcon />
                    <span className="header__cart-text">Cart</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
