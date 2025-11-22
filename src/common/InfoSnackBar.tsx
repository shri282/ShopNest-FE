import React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { blue } from "@mui/material/colors";

interface InfoSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const InfoSnackbar: React.FC<InfoSnackbarProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <SnackbarContent
        sx={{
          backgroundColor: blue[600],
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{ fontSize: 20, marginRight: 1 }} />
            {message}
          </span>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default InfoSnackbar;
