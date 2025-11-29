import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataState from "../../common/DataState";
import { useAuthContext } from "../../context/auth";
import WishlistDetailView from "./WishlistDetailView";
import WishlistSideBar from "./WishlistSideBar";
import { WishlistService } from "../../services/WishlistService";
import { IWishlistSummary } from "../../interfaces/Wishlist";

const Wishlist = () => {
  const { authContextSelector } = useAuthContext();
  const user = authContextSelector.getUser();

  const [wishlistSummaries, setWishlistSummaries] = useState<
    IWishlistSummary[] | null
  >(null);
  const [selectedWishlist, setSelectedWishlist] = useState<IWishlistSummary>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getAllWishlistSummary = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const wishlistData = await WishlistService.getAllWishlistSummary(
          user.id
        );
        setWishlistSummaries(wishlistData);
        setSelectedWishlist(wishlistData.find((ele) => ele.default));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAllWishlistSummary();
  }, [user]);

  return (
    <Box p={2} paddingTop={5}>
      <DataState
        data={wishlistSummaries}
        error={error}
        loading={loading}
        render={(data: IWishlistSummary[]) => (
          <Box mt={3} display={"flex"} gap={3}>
            <Box>
              <WishlistSideBar
                wishlistSummaries={data}
                setSelectedWishlist={setSelectedWishlist}
                selectedWishlist={selectedWishlist}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              {selectedWishlist ? (
                <WishlistDetailView wishlistId={selectedWishlist.id} />
              ) : (
                <Box
                  sx={{
                    width: 700,
                    height: 400,
                    borderRadius: 3,
                    border: "2px dashed #d1d5db",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight={500}>
                    Nothing selected yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please choose a wishlist from the left sidebar
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default Wishlist;
