import React, { ReactNode } from 'react';
import {
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import Header from '../components/Header';
import { NavTag } from '../enum/NavTag';
import { NavItem } from '../interfaces/User';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    navs: NavItem[];
    selectedNav: NavItem | null;
    onSelectNav: (nav: NavItem) => void;
    children?: ReactNode
}

export default function DashboardLayout(props: Props) {
    const { window, navs, selectedNav, onSelectNav, children } = props;
    const [open, setOpen] = React.useState(false);
    const { user } = useAuth();

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setOpen((prev) => !prev);
    };

    // const selectNavByTag = (tag: NavTag) => {
    //     let selectedNav = navs.find((nav) => nav.name === tag);
    //     if (selectedNav) {
    //         onSelectNav(selectedNav);
    //     }
    // }

    const drawer = (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    boxSizing: 'border-box',
                    backgroundColor: '#1F2937',
                    gap: 2,
                    alignItems: 'center',
                    width: '100%',
                    height: '75px',
                    overflow: 'hidden',
                    padding: 1,
                }}
            >
                <Box
                    component="img"
                    src={'/images/galina-n-miziNqvJx5M-unsplash.jpg'}
                    alt="Profile"
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                    }}
                />
                <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                    <Box
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {user?.username || 'Guest'}
                    </Box>
                    <Tooltip title={user?.email || ''} arrow>
                        <Typography
                            sx={{
                                fontSize: '0.65rem',
                                color: 'white',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                            }}
                        >
                            {user?.email}
                        </Typography>
                    </Tooltip>
                </Box>
            </Box>
            <Divider />
            <List>
                {navs.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            selected={selectedNav ? selectedNav.id === item.id : false}
                            onClick={() => {
                                onSelectNav(item);
                                setOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <img src={item.icon} alt={item.name} style={{ width: 24, height: 24 }} />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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

            <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: 'block',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '100px',
                    width: '100%',
                    height: '1200px'
                }}
            >
                <Toolbar />
                {selectedNav?.component || children}
            </Box>
        </Box>
    );
}