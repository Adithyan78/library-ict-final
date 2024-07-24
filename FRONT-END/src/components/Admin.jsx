import React from 'react';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import Toolbar from '@mui/material/Toolbar';


const Admin = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url("./libadmin.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'left', // Center align text
        position: 'relative', // Ensure relative positioning for inner elements
        
      }}
    >
      <Box>
        <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* Icon can go here */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Book Haven
            </Typography>
            <Button>
              <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button>
            <Button>
              <Link to={'/s'} style={{ textDecoration: "none", color: "white" }}>
                Login / Sign Up
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Semi-transparent background for text */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
          padding: '20px', // Adjust padding as needed
          borderRadius: '20px', // Optional: Add border radius for rounded corners
          marginBottom: '50vh' // This seems excessive; consider adjusting
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          Welcome to Admin Page
        </Typography>
      </Box>
      
      <Stack spacing={2} sx={{ position: 'relative', top: '-250px' }}> {/* Adjust the marginTop as needed */}
        <Button size='large' variant="contained"><Link to={'/Viewuser'}style={{textDecoration:"none",color:"white"}}>User</Link></Button>
        <Button size='large' variant="contained"><Link to={'/Viewbooks'}style={{textDecoration:"none",color:"white"}}>Books</Link></Button>
      </Stack>
    </Box>
  );
};

export default Admin;
