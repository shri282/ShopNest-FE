import React from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { IWishlistSummary } from "../../interfaces/Wishlist";

interface WishlistSideBarProps {
  wishlistSummaries: IWishlistSummary[];
  setSelectedWishlist: (list: IWishlistSummary) => void;
  selectedWishlist: IWishlistSummary | undefined;
}

const WishlistSideBar: React.FC<WishlistSideBarProps> = ({
  wishlistSummaries,
  setSelectedWishlist,
  selectedWishlist,
}) => {
  console.log(wishlistSummaries);
  
  return (
    <Box
      sx={{
        width: 260,
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        p: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Your Lists
      </Typography>

      <Button
        variant="contained"
        fullWidth
        size="small"
        sx={{ textTransform: "none", mb: 2 }}
      >
        Create List
      </Button>

      <Divider sx={{ mb: 1 }} />

      <List component="nav">
        {wishlistSummaries.map((list: IWishlistSummary) => (
          <ListItemButton
            key={list.id}
            onClick={() => setSelectedWishlist(list)}
            selected={
              selectedWishlist
                ? selectedWishlist.id === list.id
                : list.default
            }
          >
            <ListItemText
              primary={list.name}
              secondary={list.default ? "Default List" : ""}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default WishlistSideBar;
