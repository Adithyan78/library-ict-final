import React, { useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate ,Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const Addbook = () => {
  const [inputs, setInputs] = useState({ title: '', author: '', year: '', genre: '', isbn: '', imgurl: '', desc: '',price:'' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.val) {
      const { title, author, year, genre, isbn, imgurl, desc ,price} = location.state.val;
      setInputs({ title, author, year, genre, isbn, imgurl, desc,price });
    }
  }, [location]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const addOrUpdateBook = (event) => {
    event.preventDefault();
    if (location.state && location.state.val) {
      axios
        .put(`http://localhost:3001/edit/book/${location.state.val._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate(''); // Navigate to the same component after update
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/add/book", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate(''); // Navigate to the same component after adding new book
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
      {/* Overlaying AppBar */}
      <AppBar position="absolute" sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        width: '100%', // Ensures the AppBar spans the entire width
      }}>
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
            <Link to={'/Books'} style={{ textDecoration: "none", color: "white" }}>
              Books
            </Link>
          </Button>
          <Button>
            <Link to={'/s'} style={{ textDecoration: "none", color: "white" }}>
              Login / Sign Up
            </Link>
          </Button>

        </Toolbar>
      </AppBar>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Display the book cover image in the Avatar component */}
        <Avatar
          src={inputs.imgurl || 'default-image-url'} // Use default image URL if imgurl is empty
          alt="Book Cover"
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography component="h1" variant="h5">
          Add /Update a Book
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 24 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="title"
                variant="standard"
                required
                fullWidth
                id="title"
                label="Title"
                value={inputs.title}
                onChange={inputHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="author"
                label="Author"
                name="author"
                value={inputs.author}
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="year"
                label="Year"
                name="year"
                value={inputs.year}
                onChange={inputHandler}
                autoComplete="a"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="genre"
                label="Genre"
                name="genre"
                value={inputs.genre}
                onChange={inputHandler}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="isbn"
                label="ISBN"
                name="isbn"
                value={inputs.isbn}
                onChange={inputHandler}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12 } >
              <TextField
                variant="standard"
                required
                fullWidth
                name="imgurl"
                label="Image URL"
                type="text"
                id="imgurl"
                value={inputs.imgurl}
                onChange={inputHandler}
                autoComplete="current-password"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                value={inputs.price}
                onChange={inputHandler}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                name="desc"
                label="About"
                type="text"
                id="desc"
                value={inputs.desc}
                onChange={inputHandler}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label=""
              /> */}
            </Grid>

            {/* Grid items for each input */}
          </Grid>
          <Button
            onClick={addOrUpdateBook}
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            style={{ margin: '14px 0px 14px' }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
    </Box>
  );
};

export default Addbook;
