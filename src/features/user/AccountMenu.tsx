import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth";

const AccountMenu: React.FC = () => {
  const { authContextSelector, authContextAction } = useAuthContext();
  const user = authContextSelector.getUser();

  const navigate = useNavigate();

  const accMenuNavHandler = (label: string) => {
    switch (label) {
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
        break;

      default:
    }
  };

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
      {user ? (
        <Box p={2}>
          {/* Profile Picture */}
          <Box display="flex" alignItems={"center"} mb={1.5} gap={1.5}>
            <Avatar
              src={user.pic}
              alt={user.username}
              sx={{ width: 40, height: 40 }}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 0 }}>
              Hi, {user.username}
            </Typography>
          </Box>

          <Divider sx={{ mb: 1 }} />

          {/* Clickable Actions */}
          <Box>
            {["Profile", "Orders", "Wishlist", "Logout"].map((label) => (
              <Typography
                key={label}
                variant="body2"
                sx={{
                  py: 0.7,
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={() => accMenuNavHandler(label)}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"} p={2}>
          <Typography variant="subtitle2" gutterBottom>
            Your Account
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            fullWidth
          >
            Sign in
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AccountMenu;
