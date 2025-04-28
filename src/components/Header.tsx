import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './css/header.css';
import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate()
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
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value={10}>Electronics</MenuItem>
                    <MenuItem value={20}>Books</MenuItem>
                </Select>
                <input type="text" placeholder="Search Amazon.in" className="header__search-input" />
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
