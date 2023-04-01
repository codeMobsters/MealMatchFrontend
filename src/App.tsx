import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { LoginResponse } from "./Utils/Types";
import ProfileSettings from "./Pages/ProfileSettings";

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
    likedRecipes: []
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
          <Header user={user}/>
          <Navbar user={user} setUser={setUser} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />}></Route>
        <Route path="/feed" element={<Home user={user} setUser={setUser} />}></Route>
        <Route path="/settings" element={<ProfileSettings user={user} setUser={setUser} />}></Route>
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

export default App;
