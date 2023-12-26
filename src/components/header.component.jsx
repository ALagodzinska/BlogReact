import { Button, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";

function Header({ title }) {
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
        <Button variant="outlined" size="small">
          Sign in
        </Button>
      </Toolbar>
    </Fragment>
  );
}

export default Header;
