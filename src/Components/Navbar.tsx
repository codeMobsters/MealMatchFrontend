import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { NavbarProps } from '../Utils/Types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

export default function Navbar(props: NavbarProps) {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleExplore() {
    // navigate("/");
    console.log("explore!");
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
    // navigate("/");
    console.log("profile!");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
      <AppBar sx={{
            top: {xs: 'auto', tablet: 'auto'},
            display: {xs: 'block', tablet: 'block', desktop: 'none'},
            position: 'fixed',
            bottom : {xs: 0, tablet: 0}
      }}>
      <Toolbar>
          <HomeOutlinedIcon sx={{
            display: {tablet: 'block', desktop: 'block'},
            borderRadius: "8px"
          }}
          onClick={() => handleGoHome()}
          fontSize='large' 
          color="secondary"
          />

          <Box sx={{ flexGrow: 1 }}/>
          <ExploreOutlinedIcon onClick={() => handleExplore()} 
            sx={{
            display: {tablet: 'block', desktop: 'block'}
            }}
            fontSize='large'
            color="secondary"
          />
          
          <Box sx={{ flexGrow: 1 }}/>
          <TravelExploreOutlinedIcon onClick={() => handleSearch()}
            sx={{
              display: {tablet: 'block', desktop: 'block'}
            }}
            fontSize='large'
            color="secondary"
          />
        
          <Box sx={{ flexGrow: 1 }}/>
          <ManageAccountsOutlinedIcon  onClick={() => handleProfile()}
            sx={{
              display: {tablet: 'block', desktop: 'block'}
            }}
            fontSize='large'
            color="secondary"
          />
        </Toolbar>
    </AppBar>
  );
}