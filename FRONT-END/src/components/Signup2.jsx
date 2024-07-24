import React, { useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Signup2 = () => {
  const [inputs, setInputs] = useState({ firstName: '', lastName: '', age: '', place: '', Email: '', Password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.val) {
      const { firstName, lastName, age, place, Email, Password } = location.state.val;
      setInputs({ firstName, lastName, age, place, Email, Password });
    }
  }, [location]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const addOrUpdateUser = (event) => {
    event.preventDefault();
    if (location.state && location.state.val) {
      axios
        .put(`https://library-ict-final-backend.onrender.com/edit/user/${location.state.val._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate('/Viewuser'); // Navigate to the same component after update
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("https://library-ict-final-backend.onrender.com/add/user", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate('/Signup'); // Navigate to the same component after adding new user
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission if needed
    console.log(inputs);
  };

  const defaultTheme = createTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url("https://wallpapercave.com/wp/wp11805421.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
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
              <RouterLink to='/' style={{ textDecoration: "none", color: "white" }}>
                Home
              </RouterLink>
            </Button>
            <Button>
              <RouterLink to='/s' style={{ textDecoration: "none", color: "white" }}>
                Login / Sign Up
              </RouterLink>
            </Button>
          </Toolbar>
        </AppBar>
      
      
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar style={{ margin: 8, backgroundColor: '#f50057',marginLeft:'35px' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up 
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 24 ,marginLeft:'20px'}} noValidate>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="standard"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={inputs.firstName}
                onChange={inputHandler}
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={inputs.lastName}
                onChange={inputHandler}
                autoComplete="lname"
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                value={inputs.age}
                onChange={inputHandler}
                autoComplete="a"
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="place"
                label="Place"
                name="place"
                value={inputs.place}
                onChange={inputHandler}
                autoComplete="pl"
              />
              </Grid>
              <Grid item xs={12} >
              

              <TextField
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                value={inputs.Email}
                onChange={inputHandler}
                autoComplete="email"
              />
              </Grid>
              <Grid item xs={12} >
              <TextField
                variant="standard"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                value={inputs.Password}
                onChange={inputHandler}
                autoComplete="current-password"
              />
              </Grid>
              </Grid>
              <Button
                onClick={addOrUpdateUser}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: '24px 0px 16px' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/Signup" style={{ textDecoration: "none" }}>
                    Already have an account? Sign in
                  </RouterLink>
                </Grid>
              </Grid>
              </form>
          
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <RouterLink color="inherit" to="https://mui.com/">
              Your Website
            </RouterLink>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          </div>
        </Container>
      
    </Box>
  );
}

export default Signup2;
