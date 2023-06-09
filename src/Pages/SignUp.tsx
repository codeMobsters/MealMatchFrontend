import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RegisterRequest } from "../Utils/Types";
import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { signUpUser } from "../Utils/HelperFunctions";
import { QRcodeUrl } from "../Utils/Constants";

const theme = createTheme();

export default function SignUp() {
  const [signupRequest, setSignupRequest] = useState<RegisterRequest>({
    username: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWindowDimensions);
  },[]);

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupRequest.name.trim() == "" || 
    signupRequest.password.trim() == "" || 
    signupRequest.username.trim() == "") {
      setOpenError(true);
      return;
    }
    setOpenError(false);
    const didSignUp = await signUpUser(signupRequest);
    if (didSignUp) {
      setSignupRequest({
        username: "",
        password: "",
        name: ""
      });
      handleClickSuccess();
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      handleClickError();
    }
  };
  if (windowWidth < 600) {
  return (
    <div
      // style={{ height: "100%" }}
      className="max-w-screen-xl mx-auto items-start shadow-2xl h-screen mt-0"
    >
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
              mt: 4
            }}
          >
            MealMatch
          </Typography>
            <Avatar sx={{ m: 1, mt: 3, bgcolor: "text.secondary" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={signupRequest.username}
                    onChange={e =>
                      setSignupRequest({
                        ...signupRequest,
                        username: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Display name"
                    name="name"
                    autoComplete="name"
                    value={signupRequest.name}
                    onChange={e =>
                      setSignupRequest({
                        ...signupRequest,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={signupRequest.password}
                    onChange={e =>
                      setSignupRequest({
                        ...signupRequest,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "46px" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} sx={{ color: "text.primary" }} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      <Snackbar open={openError} autoHideDuration={2500} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Could not register!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
  }else{
    return(
      <Box className="App">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            textAlign: 'center'
          }}
        >
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            margin: "auto",
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Hi there! <br/>Unfortunately as of yet our app is optimized for mobile only. See you there:<br/>
        </Typography>
        <img src={QRcodeUrl} alt="qr code"/>
        </Box>
      </Box>
    )
  }
}
