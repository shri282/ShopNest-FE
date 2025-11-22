import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { FormMode } from "../enum/FormMode";
import { UserAddress } from "../interfaces/User";
import { UserService } from "../services/UserService";
import LoadingOverlay from "../common/LoadingOverlay";
import { useAuthContext } from "../context/auth";

interface UserAddressFormProps {
  mode: FormMode;
  address: UserAddress;
  handleClose: () => void;
  onUpdate: (address: UserAddress) => void;
}

const UserAddressForm: React.FC<UserAddressFormProps> = ({
  mode,
  address,
  handleClose,
  onUpdate,
}) => {
  const { authContextSelector } = useAuthContext();
  const user = authContextSelector.getUser();

  const [userAddress, setUserAddress] = useState<UserAddress>(address);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: keyof UserAddress, value: any) => {
    if (!userAddress) return;
    setUserAddress({ ...userAddress, [field]: value });
  };

  const handleEdit = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const updatedUserAddress = await UserService.updateAddress(
        userAddress,
        user?.id
      );
      onUpdate(updatedUserAddress);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!user) return;

    try {
      await UserService.addAddress(userAddress, user?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Name"
          value={userAddress.fullName}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          fullWidth
        />
        <TextField
          label="PH.No"
          value={userAddress.phoneNumber}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
          fullWidth
        />
      </Box>
      <TextField
        label="Street Address"
        value={userAddress.addressLine1}
        disabled={mode === "view"}
        onChange={(e) => handleFieldChange("addressLine1", e.target.value)}
        fullWidth
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="City"
          value={userAddress.city}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("city", e.target.value)}
          fullWidth
        />
        <TextField
          label="State"
          value={userAddress.state}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("state", e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Country"
          value={userAddress.country}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("country", e.target.value)}
          fullWidth
        />
        <TextField
          label="Zip Code"
          value={userAddress.postalCode}
          disabled={mode === "view"}
          onChange={(e) => handleFieldChange("postalCode", e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        {mode === "edit" && (
          <Button onClick={handleEdit} variant="contained">
            Save Address
          </Button>
        )}
        {mode === "add" && (
          <Button onClick={handleAdd} variant="contained">
            Add Address
          </Button>
        )}
      </Box>
      <LoadingOverlay loading={isLoading} />
    </Box>
  );
};

export default UserAddressForm;
