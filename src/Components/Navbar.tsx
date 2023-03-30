import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { LoginResponse, SetValue } from "../Utils/Types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

interface NavbarProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

export default function Navbar(props: NavbarProps) {
  const navigate = useNavigate();

  function handleGoHome() {
    // do it without navigate, or make it not fetch when there ias already data there
    navigate("/feed");
    console.log("feed!");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleExplore() {
    navigate("/", { state: { dummyVariable: 0 } });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleSearch() {
    // navigate("/");
    console.log("search!");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleProfile() {
    navigate(`/${props.user.id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <AppBar
      sx={{
        top: { xs: "auto", tablet: "auto" },
        display: { xs: "block", tablet: "block", desktop: "none" },
        position: "fixed",
        bottom: { xs: 0, tablet: 0 },
      }}
    >
      <Toolbar>
        <HomeOutlinedIcon
          sx={{
            display: { tablet: "block", desktop: "block" },
            borderRadius: "8px",
          }}
          onClick={() => handleGoHome()}
          fontSize="large"
          color="secondary"
        />

        <Box sx={{ flexGrow: 1 }} />
        <ExploreOutlinedIcon
          onClick={() => handleExplore()}
          sx={{
            display: { tablet: "block", desktop: "block" },
          }}
          fontSize="large"
          color="secondary"
        />

        <Box sx={{ flexGrow: 1 }} />
        <TravelExploreOutlinedIcon
          onClick={() => handleSearch()}
          sx={{
            display: { tablet: "block", desktop: "block" },
          }}
          fontSize="large"
          color="secondary"
        />

        <Box sx={{ flexGrow: 1 }} />
        <ManageAccountsOutlinedIcon
          onClick={() => handleProfile()}
          sx={{
            display: { tablet: "block", desktop: "block" },
          }}
          fontSize="large"
          color="secondary"
        />
      </Toolbar>
    </AppBar>
  );
}
