import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarProps } from '../Utils/Types';
import { Logout } from '@mui/icons-material';

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate();
    
    function handleLogout() {
        console.log(props.user);
        props.setUser({
          id: 0,
          name: "",
          token: "",
        });
        navigate("/");
      }

  return (
      <AppBar sx={{
            position: 'static',
            display: 'block',
            // position: {xs: 'fixed', tablet: 'fixed', desktop: 'static'},
            // top: {xs: 'auto', tablet: 'auto'},
            // bottom : {xs: 0, tablet: 0},
      }}>
      <Toolbar>
          <IconButton aria-label="open drawer">
            <MenuIcon  color="secondary"/>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon  color="secondary"/>
          </IconButton>
          <IconButton onClick={() => handleLogout()}>
            <Logout  color="secondary"/>
          </IconButton>
        </Toolbar>
    </AppBar>
  );
}