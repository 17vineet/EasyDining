import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Profile from './Profile'
import "./Navbar.css"
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleClick = async (e) => {
    const typeOfUser = e.target.id;
    if (typeOfUser === 'Customer') navigate('/signup');
    else navigate('/business/signup');
  }

  const handleHomeClick = () => {
    if (!currentUser) {
      navigate('/')
    }
    else if (currentUser.userType == 'customer') {
      navigate("/home");
    }
    else {
      navigate("/business/home")
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography className="Logo" onClick={handleHomeClick} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EasyDining
          </Typography>
          {
            currentUser ?
              <Profile />
              :
              <>
                <Button color="inherit" variant="outlined" onClick={handleClick} id="Customer" >
                  For Customer
                </Button>&nbsp;&nbsp;
                <Button color="inherit" variant="outlined" onClick={handleClick} id="Business">
                  For Business
                </Button>
              </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
