import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  bgColor,
  textColor,
  ctaLink,
  ctaText,
  description,
  imageUrl,
  subtitle,
  title,
}) => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" }, padding: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h6" color="#dbeafe">
          {subtitle}
        </Typography>
        <Typography variant="body1" color="#dbeafe" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          href={ctaLink}
          sx={{
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          {ctaText}
        </Button>
      </Box>
      <Box
        sx={{ width: { xs: "100%", md: "50%" }, height: "100%", padding: 2 }}
      >
        <img
          src={imageUrl}
          alt="Promo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>
    </Box>
  );
};

export default PromotionalBanner;
