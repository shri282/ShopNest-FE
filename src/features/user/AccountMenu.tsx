import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const AccountMenu: React.FC = () => {
    const { user } = useAuth();

    return (
        <Paper
            elevation={4}
            sx={{
                position: "absolute",
                top: "100%",
                right: 0,
                mt: 1,
                minWidth: 220,
                borderRadius: 1.5,
                overflow: "hidden",
                zIndex: 10,
            }}
        >
            {/* Example Menu Content */}
            {
                user ? 
                    <Box p={2}>
                        <Typography variant="subtitle2" gutterBottom>
                            Hi, { user.username }
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="body2" sx={{ py: 0.5, "&:hover": { color: "primary.main" } }}>
                            Profile
                        </Typography>
                        <Typography variant="body2" sx={{ py: 0.5, "&:hover": { color: "primary.main" } }}>
                            Orders
                        </Typography>
                        <Typography variant="body2" sx={{ py: 0.5, "&:hover": { color: "primary.main" } }}>
                            Wishlist
                        </Typography>
                        <Typography variant="body2" sx={{ py: 0.5, "&:hover": { color: "primary.main" } }}>
                            Logout
                        </Typography>
                    </Box>
                    :
                    <Box display={'flex'} flexDirection={'column'} p={2}>
                        <Typography variant="subtitle2" gutterBottom>
                            Your Account
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Button variant='contained'>Sign in</Button>
                    </Box>
            }
            
        </Paper>
    )
}

export default AccountMenu