import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        borderTop: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Container maxWidth="md">
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1.5}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            (c) {year} Personal Blog.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link component={RouterLink} to="/" underline="hover" color="inherit" variant="body2">
              Home
            </Link>
            <Link component={RouterLink} to="/posts" underline="hover" color="inherit" variant="body2">
              Posts
            </Link>
            <Link component={RouterLink} to="/login" underline="hover" color="inherit" variant="body2">
              Login
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
