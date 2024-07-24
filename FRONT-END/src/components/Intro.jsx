import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';




const Intro = () => {
  return (
    <div >
      {/* <Box 
       
      >
        <AppBar position="relative"   sx={{ backgroundColor: 'rgba(122, 38, 116, 0.8)'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Book Haven
             </Typography>
             <Button ><Link to={'/'}style={{textDecoration:"none",color:"white"}}>Home</Link></Button>
             <Button ><Link to={'/s'}style={{textDecoration:"none",color:"white"}}>login /sign up</Link></Button>
             


            
          </Toolbar>
        </AppBar>
      </Box> */}
    </div>
  );
};

export default Intro;