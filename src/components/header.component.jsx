import { Box, Button, Toolbar, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../user.context";
import { logoutUser } from "../user.actions";

function Header({ title }) {
  const [user, setUser] = useContext(UserContext);
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
            <Typography
              variant="caption"
              position={"absolute"}
              pr={2}
              right={"15%"}
              bottom={"35%"}
            >
              Hello, {user.username}
            </Typography>
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
          </Box>
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
