import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { LoginResponse } from "./Utils/Types";
import ProfileSettings from "./Pages/ProfileSettings";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import UsersList from "./Components/UsersList";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import { fetchAllUsers } from "./Utils/HelperFunctions";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useLocalStorage<LoginResponse>("user", {
    id: 0,
    name: "",
    token: "",
    profilePictureUrl: "",
    profileSettings: [],
    dietLabels: [],
    healthLabels: [],
    favoriteRecipes: [],
    likedRecipes: [],
    followedUserIds: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === 0) {
      navigate("/login");
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      {user.name && (
        <>
          <Header user={user} />
          <Navbar user={user} setUser={setUser} />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={<Home user={user} setUser={setUser} />}
        ></Route>
        <Route
          path="/explore"
          element={<Explore user={user} setUser={setUser} />}
        ></Route>
        <Route
          path="/users"
          element={<UsersList user={user} setUser={setUser} fetchFunction={fetchAllUsers} />}
        ></Route>
        <Route
          path="/settings"
          element={<ProfileSettings user={user} setUser={setUser} />}
        ></Route>
        <Route
          path=":userId"
          element={<Profile user={user} setUser={setUser} />}
        ></Route>
        <Route path="/login" element={<SignIn setUser={setUser} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: "#5d5d61",
            main: "#3c3c3d",
            dark: "#3c3c3d"
          },
          secondary: {
            light: "#e9e9f0",
            main: "#eeeef3",
            dark: "#5d5d61"
          },
          error: {
            main: "#FF0000",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            tablet: 420,
            desktop: 1200
          },
        }
      }),
    [mode]
  );

  theme.typography.h6 = {
    fontSize: '200%',
    '@media (min-width:1200px)': {
      fontSize: '400%',
    }
  };
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    sm: false;
    md: false;
    lg: false;
    xl: false;
    xs: true;
    tablet: true;
    desktop: true;
  }
}
