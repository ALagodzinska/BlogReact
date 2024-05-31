import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../user.context";
import { logoutUser } from "../user.actions";

/// CHANGE IFS HERE LOOKs BAD - BEST CONDITION PRACTICES IN REACT

function Header({ title = "BLOG" }) {
  const [user, setUser, loading] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {user ? (
          <Box>
            <Stack direction="row" spacing={2}>
              <Typography variant="caption" display="flex" alignItems="center">
                Hello, {user.username}
              </Typography>
              <Button
                component={Link}
                to="/restore"
                color="primary"
                variant="outlined"
              >
                Restore post
              </Button>
              <Button
                onClick={() => {
                  logoutUser();
                  setUser(null);
                  navigate("/");
                }}
                variant="outlined"
                size="small"
              >
                Sign out
              </Button>
            </Stack>
          </Box>
        ) : loading ? (
          <CircularProgress />
        ) : (
          <Button component={Link} to="/login" variant="outlined" size="small">
            Sign in
          </Button>
        )}
      </Toolbar>
    </Fragment>
  );
}

export default Header;
