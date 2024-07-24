import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();
const backgroundImage = 'https://t4.ftcdn.net/jpg/05/58/48/45/360_F_558484537_vyuk2C23spArvlDHWFv8Z9rTqzpMJk3t.jpg';

const Signup = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://localhost:3001/login', { Email, Password })
      .then(result => {
        console.log('Login Response:', result);

        if (result.data.status === "success") {
          console.log('Successful login, navigating to /Books');
          const userId = result.data.user.id;
          
          localStorage.setItem('userId', userId);

          navigate('/Books', { state: { userId } });
        }
        else if (result.data === "admin") {
          console.log('Admin login, navigating to /Admin');
          navigate('/Admin');
        }
        else {
          console.log('Unexpected response:', result.data);
          setError("Invalid credentials");
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        setError("Enter Your Credentials");
      })
      .finally(() => setLoading(false));
  }

  return (
    <Box sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
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

      <ThemeProvider theme={defaultTheme} >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.6)',
              padding: '20px',
              marginBottom: '90px',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '400px',
              width: '100%',
              backdropFilter: 'blur(8px)',
              p: 4,
              mt: 4
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin: 'auto' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight='bold'>
              Log To Your Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                error={!!error}
                helperText={error}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={!!error}
                helperText={error}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                  color="success"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/Signup2" style={{ textDecoration: "none", color: "blue" }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link to="https://mui.com/" style={{ textDecoration: "none", color: "inherit" }}>
              The Book Haven
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default Signup;
