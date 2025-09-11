import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { NavItem } from '../interfaces/User';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
    navs: NavItem[];
    open: boolean;
    setOpen: (val: boolean) => void;
}

export default function SideDrawer({ navs, open, setOpen }: Props) {
    const { user } = useAuth();

    const navigate = useNavigate();
    
    const [selectedNav, setSelectedNav] = React.useState<NavItem | null>(null);

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
                                setSelectedNav(item)
                                navigate(item.path)
                                setOpen(false)
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
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(!open)}
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
    )
}
