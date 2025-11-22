import { Box, Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import * as cartItemsCountTypes from "../../redux/cartItemsCount/types";
import { ICart, ICartItem } from "../../interfaces/Cart";
import { useAuthContext } from "../../context/auth";
import { useNotification } from "../../context/notification";
import { AppDispatch } from "../../redux/store";
import CartService from "../../services/CartService";

interface CartItemCardProps {
  item: ICartItem;
  setCart: (cart: ICart) => void;
  setIsLoading: (fg: boolean) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  setCart,
  setIsLoading,
}) => {
  const { authContextSelector } = useAuthContext();
  const user = authContextSelector.getUser();
  const { showMessage } = useNotification();

  const dispatch = useDispatch<AppDispatch>();

  const updateItemQuantity = async (item: ICartItem, quantity: number) => {
    if (item.quantity + quantity === 0) return removeItem(item.id);
    setIsLoading(true);

    try {
      const updatedCart: ICart = await CartService.updateCartItemQuantity(
        user.id,
        item.id,
        quantity
      );
      setCart(updatedCart);
      showMessage(
        `1 quantity ${quantity > 0 ? "added" : "removed"} successfully`,
        "Info"
      );
    } catch (error: any) {
      showMessage(error.message, "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    setIsLoading(true);

    try {
      const updatedCart: ICart = await CartService.removeCartItem(
        user.id,
        itemId
      );
      dispatch({ type: cartItemsCountTypes.DECREMENT });
      setCart(updatedCart);
      showMessage("item removed successfully", "Info");
    } catch (error: any) {
      showMessage(error.message, "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        border: "1px solid #eee",
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={item.imageURL}
        alt={item.productName}
        sx={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 1,
        }}
      />

      {/* Product Info */}
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography fontWeight={500}>{item.productName}</Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: 12,
            color: item.availability ? "green" : "red",
            mt: 0.5,
          }}
        >
          {item.availability ? "In stock" : "Out of stock"}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 13, mt: 1, color: "#555" }}>
          Unit Price: <b>₹{item.unitPrice.toFixed(2)}</b>
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box sx={{ display: "flex", flex: 1, alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => updateItemQuantity(item, -1)}
          sx={{ minWidth: 32, height: 32, fontSize: 18 }}
        >
          -
        </Button>
        <Typography sx={{ minWidth: 24, textAlign: "center", fontWeight: 500 }}>
          {item.quantity}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => updateItemQuantity(item, 1)}
          sx={{ minWidth: 32, height: 32, fontSize: 18 }}
        >
          +
        </Button>
      </Box>

      {/* Total Price */}
      <Box sx={{ textAlign: "right", minWidth: 100 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
          ₹{(item.unitPrice * item.quantity).toFixed(2)}
        </Typography>
      </Box>

      {/* Remove Button */}
      <Box
        onClick={() => removeItem(item.id)}
        sx={{
          ml: 2,
          color: "#d32f2f",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          transition: "background 0.2s",
          "&:hover": {
            backgroundColor: "#ffe6e6",
          },
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>×</Typography>
      </Box>
    </Box>
  );
};

export default CartItemCard;
