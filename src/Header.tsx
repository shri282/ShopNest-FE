import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "./hooks/useThrottle";
import { IProduct } from "./interfaces/Product";
import ProductService from "./services/ProductService";
import { AppBar, Badge, Link, Box, Divider, IconButton, InputBase, List, ListItemButton, ListItemText, MenuItem, Paper, Select, styled, Toolbar, Typography, ClickAwayListener } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useCartItemCount } from "./features/cart/hooks/useCartItemCount";
import { AppDispatch, RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as cartItemsCountActionTypes from "./redux/cartItemsCount/types";
import AccountMenu from "./features/user/AccountMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuthContext } from "./context/auth";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

interface HeaderProps {
    handleDrawerToggle?: () => void
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
    const navigate = useNavigate();
    const { authContextSelector } = useAuthContext();
    const user = authContextSelector.getUser();
    const token = authContextSelector.getToken();

    const cartItemsCountInit = useCartItemCount(user?.id);
    const cartItemsCount = useSelector((state: RootState) => state.cartItemsCount.value);
    const dispatch = useDispatch<AppDispatch>();
    const [field, setField] = useState<string>("all");
    const [keyword, setKeyword] = useState<string>("");
    const throttledKeyword = useThrottle(keyword, 500);
    const [searchResults, setSearchResults] = useState<Map<string, IProduct[]>>(new Map());
    const [showDropdown, setShowDropdown] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState<Boolean>(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const searchProducts = useCallback(async () => {
        if (!throttledKeyword.trim()) {
            setSearchResults(new Map());
            return;
        }

        const products = await ProductService.searchProducts(field, throttledKeyword);
        const searchRes = ProductService.getSearchResultMap(throttledKeyword, products);

        setSearchResults(searchRes);
        setShowDropdown(true);
    }, [field, throttledKeyword]);

    useEffect(() => {
        searchProducts();
    }, [searchProducts]);

    useEffect(() => {
        dispatch({ type: cartItemsCountActionTypes.ADD, payload: cartItemsCountInit })
    }, [cartItemsCountInit, dispatch])

    return (
        <AppBar position="sticky" color="primary" sx={{ height: '100%', width: '100%', backgroundColor: '#111827' }}>
            <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'stretch' }}>

                {/* Main Header */}
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" py={1}>
                    {/* Logo and Menu */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography
                            onClick={() => navigate("/")}
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(to right, #f97316, #ea580c)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Shopnest
                        </Typography>

                    </Box>

                    {/* Search */}
                    <Box display="flex" flex={1} mx={4} alignItems="center" gap={1}>
                        {/* Select with MenuIcon on the left */}
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                backgroundColor: '#1f2937',
                                borderRadius: 1,
                                height: 40, // Match Search input height
                                pr: 1,
                                pl: 1.5,
                                mr: 2,
                                minWidth: 120,
                                flexShrink: 0,
                            }}
                        >
                            <MenuIcon sx={{ color: 'white', fontSize: 20, mr: 1 }} />
                            <Select
                                variant="standard"
                                disableUnderline
                                value={field}
                                onChange={(e) => setField(e.target.value as string)}
                                sx={{
                                    color: 'white',
                                    minWidth: 40,
                                    '& .MuiSelect-select': {
                                        padding: 0,
                                    },
                                    '& .MuiSelect-icon': {
                                        display: 'none', // Hide dropdown arrow
                                    },
                                }}
                            >
                                <MenuItem value="all"><em>All</em></MenuItem>
                                <MenuItem value="category">Category</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="brand">Brand</MenuItem>
                            </Select>
                        </Box>

                        {/* Search input */}
                        <Search sx={{ flex: 1, height: 40, position: 'relative' }}>
                            <StyledInputBase
                                placeholder="Search Shopnest..."
                                sx={{ height: 40, width: '100%' }}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => {
                                    if (searchResults.size > 0) setShowDropdown(true);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setShowDropdown(false), 800);
                                }}
                            />
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: '#fff' }} />
                            </SearchIconWrapper>

                            {/* MUI Dropdown */}
                            {showDropdown && searchResults.size > 0 && (
                                <Paper
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        zIndex: 5,
                                        maxHeight: 300,
                                        overflowY: 'auto',
                                        mt: 0.5,
                                        border: '1px solid #ccc',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <List dense disablePadding>
                                        {Array.from(searchResults.entries()).map(([key, products]) => (
                                            <ListItemButton
                                                key={key}
                                                onClick={() => {
                                                    navigate('/search-results', { state: products });
                                                    setShowDropdown(false);
                                                    setKeyword('');
                                                }}
                                                sx={{
                                                    color: 'black',
                                                    fontSize: 16,
                                                    px: 2,
                                                    py: 1.25,
                                                    '&:hover': {
                                                        bgcolor: '#2D3748',
                                                        color: 'white',
                                                    },
                                                }}
                                            >
                                                <ListItemText primary={key} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Paper>
                            )}
                        </Search>
                    </Box>

                    {/* User & Cart */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <ClickAwayListener onClickAway={() => setOpenAccountMenu(false)}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                lineHeight={1}
                                sx={{
                                    cursor: "pointer",
                                    px: 1,
                                    py: 0.5,
                                    border: "1px solid transparent",
                                    borderRadius: "4px",
                                    "&:hover": {
                                        border: "1px solid white",
                                    },
                                    position: "relative",
                                }}
                                onClick={() => setOpenAccountMenu((prev) => !prev)}
                            >
                                <Typography variant="body2" sx={{ fontSize: 12, lineHeight: 1 }}>
                                    Hello, {user ? user.username : "guest"}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: 12, fontWeight: "bold" }}
                                    >
                                        Accounts & Lists
                                    </Typography>
                                    <ArrowDropDownIcon sx={{ fontSize: 18 }} />
                                </Box>
                                {openAccountMenu && (<AccountMenu />)}
                            </Box>
                        </ClickAwayListener>

                        <IconButton
                            onClick={() => {
                                if (user && token) {
                                    return navigate("/user/cart");
                                }
                                return navigate("/login");
                            }}
                            color="inherit"
                        >
                            <Badge badgeContent={cartItemsCount} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Box>

                {/* Navigation Links */}
                {
                    !scrolled && (<>
                        <Divider sx={{ borderColor: '#374151' }} />
                        <Box display="flex" height={40} alignItems={'center'} gap={3}>
                            {
                                handleDrawerToggle && <IconButton
                                    color="inherit"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            }
                            {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((text) => (
                                <Link
                                    key={text}
                                    href="#"
                                    underline="hover"
                                    color="inherit"
                                    sx={{
                                        '&:hover': {
                                            color: '#f97316',
                                        },
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {text}
                                </Link>
                            ))}
                        </Box>
                    </>)
                }

            </Toolbar>
        </AppBar>
    );
};

export default Header;
