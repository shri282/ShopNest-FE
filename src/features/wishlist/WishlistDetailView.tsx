import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

import { IWishlistDetail, IWishlistItem } from "../../interfaces/Wishlist";
import useOnFetch from "../../hooks/useOnFetch";
import { WishlistService } from "../../services/WishlistService";
import { useAuthContext } from "../../context/auth";
import DataState from "../../common/DataState";
import { formatReadableDate } from "../../utils/date";

const sortWishlistItems = (
  items: IWishlistItem[],
  orderby: string
): IWishlistItem[] => {
  switch (orderby) {
    case "recent":
      return [...items].sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      );
    case "price-low":
      return [...items].sort((a, b) => a.productPrize - b.productPrize);
    case "price-high":
      return [...items].sort((a, b) => b.productPrize - a.productPrize);
    default:
      return items;
  }
};

const WishlistDetailView = ({ wishlistId }: { wishlistId: number }) => {
  const { authContextSelector } = useAuthContext();
  const user = authContextSelector.getUser();

  const {
    result: wishlist,
    onFetch: fetchWishlist,
    isLoading,
    error,
  } = useOnFetch<IWishlistDetail | null>();

  const [searchStr, setSearchStr] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("recent");

  useEffect(() => {
    if (!user) return;
    fetchWishlist(WishlistService.getWishlist(user.id, wishlistId));
  }, [wishlistId, user]);

  const orderedWishlistItems = useMemo(() => {
    if (!wishlist?.wishlistItems) return [];

    const filtered = wishlist.wishlistItems.filter((item) => {
      if (!searchStr.trim()) return true;
      const lower = searchStr.toLowerCase();
      return (
        item.productName.toLowerCase().includes(lower) ||
        item.productDescription.toLowerCase().includes(lower)
      );
    });

    return sortWishlistItems(filtered, orderby);
  }, [wishlist, searchStr, orderby]);

  return (
    <Box>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography mr={2} variant="h5" fontWeight={600}>
          Shopping List
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            size="small"
            placeholder="Search this list"
            sx={{ width: 240 }}
          />

          <TextField size="small" select defaultValue="unpurchased">
            <MenuItem value="unpurchased">Unpurchased</MenuItem>
            <MenuItem value="purchased">Purchased</MenuItem>
          </TextField>

          <TextField
            size="small"
            select
            value={orderby}
            onChange={(e) => setOrderby(e.target.value)}
          >
            <MenuItem value="recent">Most recently added</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
          </TextField>
        </Stack>
      </Stack>

      <DataState
        data={wishlist}
        loading={isLoading}
        error={error}
        render={() => (
          <Box>
            {orderedWishlistItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  display: "flex",
                  p: 2,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: "contain" }}
                  image={item.productImageUrl}
                  alt={item.productName}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.productName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Added {formatReadableDate(item.addedAt)}
                  </Typography>

                  <Typography variant="h6" mt={1}>
                    ₹{item.productPrize}.00
                  </Typography>

                  <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" size="small">
                      Add to Cart
                    </Button>
                    <Button variant="outlined" size="small">
                      Move
                    </Button>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      />
    </Box>
  );
};

export default WishlistDetailView;
