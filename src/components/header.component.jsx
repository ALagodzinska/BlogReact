import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../user.context";
import { logoutUser } from "../user.actions";

function Header({ title = "BLOG" }) {
  const [user, setUser, loading] = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="md" disableGutters>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            component={Link}
            to="/"
            sx={{
              mr: 2,
              mt: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {title}
          </Typography>
          <Box>
            <Typography
              component={Link}
              to="/"
              sx={{
                mt: 1,
                mr: 3,
                textDecoration: "none",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              POSTS
            </Typography>
            {user && (
              <Typography
                component={Link}
                to="/restore"
                sx={{
                  mt: 1,
                  mr: 3,
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                RESTORE POST
              </Typography>
            )}
          </Box>
          <Box>
            {user ? (
              <Typography
                sx={{
                  mt: 1,
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
                onClick={() => {
                  logoutUser();
                  setUser(null);
                  navigate("/");
                }}
              >
                LOGOUT
              </Typography>
            ) : (
              <Typography
                component={Link}
                to="/login"
                sx={{
                  mt: 1,
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                LOGIN
              </Typography>
            )}
          </Box>
        </Stack>
      </Container>
    </Toolbar>
  );
}

export default Header;
