import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useAuth } from '../context/AuthContext';
import { Tooltip, Typography } from '@mui/material';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    Header: React.ReactNode;
    navs: Array<Object>;
    children?: React.ReactNode;
}

export default function SideDrawer(props: Props) {
    const { user } = useAuth();
    const { Header, navs, children } = props;
    const defaultBody: any = navs.find((ele: any) => ele.default);
    const [body, setBody] = React.useState<any>(defaultBody)
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

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
            <List sx={{ py: 1, backgroundColor: 'white', height: `calc(100vh - 76px)` }}>
                {navs.map((nav: any, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => setBody(nav)}
                            sx={{
                                px: 2.5,
                                py: 1.2,
                                borderRadius: 2,
                                mx: 1,
                                my: 0.5,
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#e0e0e0',
                                    '&:hover': {
                                        backgroundColor: '#d5d5d5',
                                    },
                                },
                            }}
                            selected={body?.name === nav.name}
                        >
                            <ListItemIcon sx={{ color: 'brown', minWidth: 36 }}>
                                <Box
                                    component="img"
                                    src={nav.iconSrc}
                                    alt="icon"
                                    sx={{ width: 24, height: 24 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={nav.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: 'margin 0.3s, width 0.3s',
                    backgroundColor: "#1F2937",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {Header}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: 'margin 0.3s, width 0.3s',
                }}
            >
                {/* reason for some margin in top */}
                <Toolbar />
                {body?.component || children}
            </Box>
        </Box>
    );
}
