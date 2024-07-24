import React from 'react';
import { Box, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Home = () => {
  return (
    <div style={{
      backgroundImage: `url("./banner.jpg")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'flex-start',
      color: 'white',
      textAlign: 'left',
      position: 'relative',
    }} >
       <Box>
        <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
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
            {/* <Button>
              <Link to={'/b'} style={{ textDecoration: "none", color: "white" }}>
                Books
              </Link>
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
        <Box sx={{ textAlign: 'left', paddingLeft: '100px', paddingTop: '20px' }}>
          <Typography variant="h2" component="h1" sx={{ zIndex: 2, mt: 20, fontWeight: 'bold' }}>
            Connect. Discover. Grow:
          </Typography>
          <Typography variant="h2" component="h1" sx={{ zIndex: 2, mt: -1, fontWeight: 'bold', paddingLeft: '10px' }}>
            Your Library, Your Community
          </Typography>
          <Typography variant="h6" component="h1" sx={{ zIndex: 2, mt: 5, paddingLeft: '10px', paddingBottom: '30px' }}>
            Welcome to our library! Dive into a world of stories, knowledge, and inspiration. Explore classics <br></br> and new favorites, and join us in discovering endless possibilities through the power of books.
          </Typography>
          
          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <InstagramIcon sx={{ color: 'white', fontSize: '2.5rem', marginRight: '20px',paddingTop:'230px' }} />
            
            <GitHubIcon sx={{ color: 'white', fontSize: '2.5rem' ,paddingTop:'230px',marginRight:'20px'}} />
            <LinkedInIcon sx={{ color: 'white', fontSize: '2.5rem' ,paddingTop:'230px'}} />
          </Box>
        </Box>
      
    </div>
  );
};

export default Home;
