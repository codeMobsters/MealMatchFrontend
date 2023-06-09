import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { LoginRequest, LoginResponse, SetValue } from "../Utils/Types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { baseUrl, QRcodeUrl } from "../Utils/Constants";

const theme = createTheme();

interface signInProps {
  setUser: SetValue<LoginResponse>;
}

export default function SignIn(props: signInProps) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClickForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenForgotPassword(false);
  };

  const loginUser = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...loginRequest,
        }),
      };

      const response = await fetch(
        `${baseUrl}/Users/Authentication/login`,
        requestOptions
      );
      if (response.ok) {
        const json = await response.json();
        props.setUser(json);
      }
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didLogIn = await loginUser();
    if (didLogIn) {
      setLoginRequest({
        username: "",
        password: "",
      });
      navigate("/");
    } else {
      handleClickError();
    }
  };

  if (windowWidth < 600) {
    return (
      <div className="max-w-screen-xl mx-auto items-start shadow-2xl h-screen min-h-full mt-0">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "2rem",
                letterSpacing: ".4rem",
                color: "text.primary",
                textDecoration: "none",
                mt: 4,
              }}
            >
              MealMatch
            </Typography>
            <Avatar sx={{ m: 1, mt: 3, bgcolor: "text.secondary" }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={loginRequest.username}
                onChange={(e) =>
                  setLoginRequest({
                    ...loginRequest,
                    username: e.target.value,
                  })
                }
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
                value={loginRequest.password}
                onChange={(e) =>
                  setLoginRequest({
                    ...loginRequest,
                    password: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, height: "46px" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{ color: "text.primary" }}
                    variant="body2"
                    onClick={handleClickForgotPassword}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="body2"
                    sx={{ color: "text.primary" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Snackbar
          open={openForgotPassword}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="warning"
            sx={{
              width: "100%",
            }}
          >
            Ha-Ha! Tough luck!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Wrong username or password!
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return (
      <Box className="App">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              width: "fit-content",
              margin: "auto",
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hi there! <br />
            Unfortunately as of yet our app is optimized for mobile only. See
            you there:
            <br />
          </Typography>
          <img src={QRcodeUrl} alt="qr code" />
        </Box>
      </Box>
    );
  }
}
