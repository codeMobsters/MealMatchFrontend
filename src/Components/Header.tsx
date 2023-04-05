// @ts-nocheck
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PostRecipeDialog from "./PostRecipeDialog";
import { HeaderProps } from "../Utils/Types";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../App";

function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const handlePostAction = () => {
    setOpenPostDialog(true);
  };
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  function handleGoHome() {
    navigate("/", { state: { dummyVariable: 0 } });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <AppBar
      sx={{
        bottom: "auto",
        display: "block",
        height: { xs: "56px", tablet: "56px", desktop: "100px" },
        position: "fixed",
        top: 0,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => handleGoHome()}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "secondary.main",
              textDecoration: "none",
            }}
          >
            MealMatch
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {/* {theme.palette.mode} mode */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Typography
            onClick={() => handlePostAction()}
            sx={{ 
              border: 1, 
              borderColor: "#ffffff", 
              borderRadius: 2, 
              padding: 0.5, 
              display: { xs: "block", tablet: "block", desktop: "none" }
            }}
          > Add recipe
          </Typography>
          <PostRecipeDialog
            user={props.user}
            openPostDialog={openPostDialog}
            setOpenPostDialog={setOpenPostDialog}
            setUser={props.setUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
