import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#111827",
        p: 5,
        marginTop: 5,
        paddingBottom: 10,
        color: "white",
      }}
    >
      {/* Subscribe */}
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h4" color="brown">
          Say Hello!!!
        </Typography>
        <Typography variant="subtitle2">
          Get the lates trends delivered to your inbox!!
        </Typography>
        <Button variant="contained" color="secondary">
          SUBSCRIBE
        </Button>
      </Box>

      {/* Quick Links */}
      <Box
        sx={{
          display: "flex",
          gap: 5,
          textTransform: "uppercase",
          marginRight: 10,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, color: "brown" }}>home</Typography>
          <Box my={2} sx={{ cursor: "pointer" }}>
            <Typography variant="subtitle1">offers</Typography>
            <Typography variant="subtitle1">products</Typography>
            <Typography variant="subtitle1">New arrivals</Typography>
            <Typography variant="subtitle1">best selling</Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: "brown" }}>
            company
          </Typography>
          <Box my={2} sx={{ cursor: "pointer" }}>
            <Typography variant="subtitle1">about us</Typography>
            <Typography variant="subtitle1">community</Typography>
            <Typography variant="subtitle1">reviews</Typography>
            <Typography variant="subtitle1">faq</Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: "brown" }}>
            social
          </Typography>
          <Box my={2} sx={{ cursor: "pointer" }}>
            <Typography variant="subtitle1">instagram</Typography>
            <Typography variant="subtitle1">facebook</Typography>
            <Typography variant="subtitle1">twitter</Typography>
            <Typography variant="subtitle1">linkedin</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
