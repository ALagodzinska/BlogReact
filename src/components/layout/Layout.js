import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./header.component.jsx";
import Footer from "./footer.component";

// Base layout used by every page.
const Layout = () => {
  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ bgcolor: "background.paper" }}>
        <Header />
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
