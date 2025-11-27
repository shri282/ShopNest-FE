import { Box, Button, Typography, TextField, IconButton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#111827",
        color: "white",
        py: 8,
        px: { xs: 3, md: 10 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      {/* Subscribe */}
      <Box sx={{ maxWidth: 350 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#f97316" }}>
          Say Hello!!!
        </Typography>

        <Typography mt={1} variant="subtitle2" color="#cbd5e1">
          Get the latest trends delivered to your inbox!
        </Typography>

        <Stack direction="row" spacing={1} mt={3}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter your email"
            sx={{
              flex: 1,
              bgcolor: "white",
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f97316",
              "&:hover": { bgcolor: "#ea580c" },
              px: 3,
            }}
          >
            SUBSCRIBE
          </Button>
        </Stack>
      </Box>

      {/* Quick Links */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 5, md: 10 },
          textTransform: "capitalize",
        }}
      >
        {[
          {
            title: "Home",
            links: ["offers", "products", "new arrivals", "best selling"],
          },
          {
            title: "Company",
            links: ["about us", "community", "reviews", "faq"],
          },
          {
            title: "Social",
            links: ["instagram", "facebook", "twitter", "linkedin"],
          },
        ].map((section) => (
          <Box key={section.title}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#f97316" }}>
              {section.title}
            </Typography>
            <Box mt={2} sx={{ cursor: "pointer" }}>
              {section.links.map((l) => (
                <Typography
                  key={l}
                  variant="subtitle2"
                  sx={{
                    my: 0.5,
                    color: "#cbd5e1",
                    transition: "color .3s",
                    "&:hover": { color: "#f97316" },
                  }}
                >
                  {l}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Social icons */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#f97316", mb: 2 }}>
          Follow Us
        </Typography>
        <Stack direction="row" spacing={2}>
          {[InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon].map((Icon, i) => (
            <IconButton
              key={i}
              sx={{
                color: "#cbd5e1",
                "&:hover": { color: "#f97316", transform: "scale(1.2)" },
                transition: ".3s",
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;