import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    Header: React.ReactNode;
    children: React.ReactNode;
}

export default function AdminSideDrawer(props: Props) {
    const { user } = useAuth();
    const { Header, children } = props;
    const [open, setOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const drawer = (
        <div>
            <Box sx={{ display: 'flex', backgroundColor: 'brown', gap: 2, alignItems: 'center' }}>
                <Box
                    component="img"
                    src={'/images/galina-n-miziNqvJx5M-unsplash.jpg'}
                    alt="Profile"
                    sx={{
                        width: '40%',
                        height: '75px'
                    }}
                />
                <Box>
                    <Box sx={{ fontWeight: 'bold', color: 'white' }}>{user?.username || 'Guest'}</Box>
                    <Box sx={{ fontSize: '0.65rem', color: 'white' }}>{user?.email}</Box>
                </Box>
            </Box>
            <Divider />
            <List>
                {['Products', 'Orders', 'Revenue', 'Analytics'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
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
                    backgroundColor: "#1f1f1f",
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
                    marginTop: 5,
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: 'margin 0.3s, width 0.3s',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
