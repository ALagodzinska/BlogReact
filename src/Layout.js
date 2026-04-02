import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header.component";
import { Box } from "@mui/material";
import { useState } from "react";

// BASE FOR EVERY PAGE — wrap in a Box and apply a subtle gray background
const Layout = () => {
  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh' }}>
      {/* keep header white */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Header />
      </Box>
      {/* main content stays on gray background */}
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
