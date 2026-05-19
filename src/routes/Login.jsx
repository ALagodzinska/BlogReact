import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import UserContext from "../context/user.context";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../services/userService";
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from "../utils/constants";
import styles from "../styles/pages/login.styles";

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
  const [, setUser] = useContext(UserContext);
  const [userError, setUserError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const localErrors = validateValues(email, password);
    setErrors(localErrors);
    if (Object.keys(localErrors).length === 0) {
      try {
        const userObject = await getLoggedInUser(email, password);
        setUser(userObject);
        navigate("/posts");
      } catch (error) {
        setLoading(false);
        console.error(error);
        setUserError(true);
      }
    }
  };

  return (
    <Box sx={styles.page}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={styles.card}>
          <Avatar sx={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={styles.title}>
            Sign in
          </Typography>
          <Typography sx={styles.subtitle}>
            Access your dashboard and continue writing.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={styles.form}
          >
            <Box sx={styles.errorBox}>
              {userError && (
                <Typography sx={styles.errorText}>No user found.</Typography>
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
              sx={styles.textField}
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
              sx={styles.textField}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) delete errors.password;
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submitButton}
              disabled={loading}
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
