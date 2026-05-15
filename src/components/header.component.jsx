import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../user.context";
import { logoutUser } from "../services/userService";
import {
  toolbarSx,
  stackSx,
  titleSx,
  centerBoxSx,
  rightBoxSx,
  buttonSx,
  containerSx,
} from "../styles/components/header.styles";

function Header({ title = "BLOG" }) {
  const [user, setUser, loading] = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Toolbar sx={toolbarSx}>
      <Container maxWidth="md" sx={containerSx}>
        <Stack direction="row" alignItems="center" sx={stackSx}>
          <Typography component={Link} to="/" sx={titleSx}>
            {title}
          </Typography>

          <Box sx={centerBoxSx}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={Link}
                to="/posts"
                color="inherit"
                size="small"
                sx={buttonSx}
                disableElevation
                disableRipple
              >
                <span className="navLabel">POSTS</span>
              </Button>
              {user && (
                <Button
                  component={Link}
                  to="/restore"
                  color="inherit"
                  size="small"
                  sx={buttonSx}
                  disableElevation
                  disableRipple
                >
                  <span className="navLabel">RESTORE POST</span>
                </Button>
              )}
            </Stack>
          </Box>

          <Box sx={rightBoxSx}>
            {user ? (
              <Button
                color="inherit"
                size="small"
                sx={buttonSx}
                disableElevation
                disableRipple
                onClick={() => {
                  logoutUser();
                  setUser(null);
                  navigate("/");
                }}
              >
                <span className="navLabel">LOGOUT</span>
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="inherit"
                size="small"
                sx={buttonSx}
                disableElevation
                disableRipple
              >
                <span className="navLabel">LOGIN</span>
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
    </Toolbar>
  );
}

export default Header;
