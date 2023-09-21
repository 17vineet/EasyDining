import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import useLogout from '../hooks/useLogout' ; 

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const logout = useLogout() ; 

  const handleClick = async (e) => {
    const typeOfUser = e.target.id;
    if (currentUser) {
      await logout() ; 
      navigate('/');
    }
    else if (typeOfUser === 'Customer') navigate('/signup') ;
    else navigate('/business/signup') ;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EasyDining
          </Typography>
          {
            currentUser ?
              <Button color="inherit" variant="outlined" onClick={handleClick}>
                Signout
              </Button> :
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
