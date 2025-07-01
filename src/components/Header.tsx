import React, { useCallback, useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './css/header.css';
import { Button, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { IProduct } from '../interfaces/Product';
import { useThrottle } from '../hooks/useThrottle';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, token, logout } = useAuth();
    const [field, setField] = useState<string>("all");
    const [keyword, setKeyword] = useState<string>("");
    const throttledKeyword = useThrottle(keyword, 500);
    const [searchResults, setSearchResults] = useState<Map<string, IProduct[]>>(new Map());
    const [showDropdown, setShowDropdown] = useState(false);

    const searchProducts = useCallback(async () => {
        if (!throttledKeyword.trim()) {
            setSearchResults(new Map());
            return;
        }

        const products = await ProductService.searchProducts(field, throttledKeyword);
        const searchRes = ProductService.mapProductToSearchResults(field, throttledKeyword, products);

        setSearchResults(searchRes);
        setShowDropdown(true);
    }, [field, throttledKeyword]);

    useEffect(() => {
        searchProducts();
    }, [searchProducts]);

    return (
        <header className="header">
            <div className="header__left">
                <img onClick={() => navigate("/")} className="header__logo" src="/images/logoo.webp" alt="Logo" />
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

                <div className="header__search-container">
                    <input
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => {
                            if (searchResults.size > 0) setShowDropdown(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => setShowDropdown(false), 800);
                        }}
                        type="text"
                        placeholder="Search shopnest.in"
                        className="header__search-input"
                    />

                    {showDropdown && searchResults.size > 0 && (
                        <div className="header__search-results">
                            {Array.from(searchResults.entries()).map(([key, products]) => (
                                <div
                                    key={key}
                                    className="header__search-item"
                                    onClick={() => {
                                        navigate(`/search-results`, { state: products });
                                        setShowDropdown(false);
                                        setKeyword('');
                                    }}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {
                (user && token) ?
                    <div className="header__right">
                        <div onClick={() => navigate("/user/cart")} className="header__cart">
                            <ShoppingCartOutlinedIcon />
                            <span className="header__cart-text">Cart</span>
                        </div>
                        <div className="header__auth">
                            <Button onClick={logout} variant='contained'>logout</Button>
                        </div>
                    </div>
                    :
                    <div className="header__right">
                        <div className="header__auth">
                            <a href="/login" className="header__link">Sign in</a>
                            <span className="header__separator">|</span>
                            <a href="/register" className="header__link">Register</a>
                        </div>
                    </div>
            }
        </header>
    );
};

export default Header;
