import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import React from "react";
import PostRecipeDialog from "./PostRecipeDialog";
import { HeaderProps } from "../Utils/Types";


function Header(props :HeaderProps) {
  const navigate = useNavigate();
  const [openPostDialog, setOpenPostDialog] = React.useState(false);
  const handlePostAction = () => {
    setOpenPostDialog(true);
  };

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
        bottom: { xs: "auto", tablet: "auto" },
        display: { xs: "block", tablet: "block", desktop: "none" },
        position: "fixed",
        top: { xs: 0, tablet: 0 },
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
              letterSpacing: ".3rem",
              color: "secondary.main",
              textDecoration: "none",
            }}
          >
            MealMatch
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Avatar
            alt="userPicture"
            src="insert user avatar"
            onClick={() => handlePostAction()}
          />
          <PostRecipeDialog
            user={props.user}
            openPostDialog={openPostDialog}
            setOpenPostDialog={setOpenPostDialog}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
