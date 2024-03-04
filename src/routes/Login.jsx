import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/header.component";
import { useContext, useState } from "react";
import UserContext from "../user.context";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../user.actions";
import { EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from "../constants";

const validateValues = (email, password) => {
  let errors = {};
  if (email.trim() === "") {
    errors.email = EMAIL_ERROR_MESSAGE;
  }
  if (password.trim() === "") {
    errors.password = PASSWORD_ERROR_MESSAGE;
  }
  return errors;
};

function Login() {
  const [user, setUser] = useContext(UserContext);
  const [userError, setUserError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const localErrors = validateValues(email, password);
    setErrors(localErrors);
    if (Object.keys(localErrors).length === 0) {
      try {
        const userObject = await getLoggedInUser(email, password);
        setUser(userObject);
        navigate("/");
      } catch (error) {
        console.error(error);
        setUserError(true);
      }
    }
  };

  return (
    <Box>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box height={10} pb={2}>
              {userError && (
                <Typography sx={{ textAlign: "center", color: "red" }}>
                  No user found.
                </Typography>
              )}
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email && true}
              helperText={errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) delete errors.email;
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password && true}
              helperText={errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) delete errors.password;
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
