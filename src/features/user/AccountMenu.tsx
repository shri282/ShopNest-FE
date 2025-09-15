import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const AccountMenu: React.FC = () => {
    const { authContextSelector, authContextAction } = useAuthContext();
    const user = authContextSelector.getUser();

    const navigate = useNavigate();

    const accMenuNavHandler = (event: any) => {
        switch (event.target.innerText) {
            case "Profile":
                navigate("/profile");
                break;
            case "Orders":
                navigate("/orders");
                break;
            case "Wishlist":
                navigate("/wishlist");
                break;
            case "Logout":
                authContextAction.logout();
                navigate("/login");
                break;

            default:
        }
    }

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
                            Hi, {user.username}
                        </Typography>
                        <Divider sx={{ mb: 1 }} />

                        {/* Actions */}
                        <Box onClick={accMenuNavHandler}>
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
                    </Box>
                    :
                    <Box display={'flex'} flexDirection={'column'} p={2}>
                        <Typography variant="subtitle2" gutterBottom>
                            Your Account
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Button onClick={() => navigate("/login")} variant='contained'>Sign in</Button>
                    </Box>
            }

        </Paper>
    )
}

export default AccountMenu