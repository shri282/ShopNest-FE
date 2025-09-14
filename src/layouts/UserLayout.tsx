import React from 'react';
import {
    Box,
    CssBaseline,
    Toolbar
} from '@mui/material';
import Header from '../Header';
import { NavItem } from '../interfaces/User';
import { Outlet } from 'react-router-dom';
import SideDrawer from '../common/SideDrawer';

const navs: NavItem[] = [
    {
        id: 1,
        name: 'Orders',
        path: "/orders",
        icon: 'images/order.png',
    },
    {
        id: 2,
        name: 'Wishlist',
        path: "/wishlist",
        icon: 'images/wishlist.png',
    }
];

export default function UserLayout() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <Box
                position={'fixed'}
                sx={{
                    width: `100%`,
                    height: 'auto',
                    zIndex: 1100
                }}
            >
                <Header handleDrawerToggle={handleDrawerToggle} />
            </Box>

            {/* Drawer */}
            <SideDrawer navs={navs} open={open} setOpen={setOpen} />

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '65px',
                    width: '100%',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}