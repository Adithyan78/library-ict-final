import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography, IconButton, Button, AppBar, Toolbar, Grid, Avatar,
  ListItemIcon, Divider, Tooltip, TextField, Box, Paper, Container, Card, CardContent, CardMedia, Menu, MenuItem
} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [likedBooks, setLikedBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('liked'); // 'liked' or 'rented'
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate('/');
  };

  const signUp = () => {
    navigate('/Signup2');
  };

  const proOpen = () => {
    navigate('/Profile');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const response = await axios.get(`https://library-ict-final-backend.onrender.com/user/${userId}`);
        setUser(response.data);

        const likedBooksResponse = await axios.get(`https://library-ict-final-backend.onrender.com/liked-books/${userId}`);
        setLikedBooks(likedBooksResponse.data.likedBooks);

        const rentedBooksResponse = await axios.get(`https://library-ict-final-backend.onrender.com/rented-books/${userId}`);
        setRentedBooks(rentedBooksResponse.data.rentedBooks);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`https://library-ict-final-backend.onrender.com/edit/user/${user._id}`, user);
      alert(response.data.message);
      navigate('/Profile');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRentBook = (bookId) => {
    navigate(`/Pay/${bookId}`);
  };

  const handleUnlikeBook = async (bookId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`https://library-ict-final-backend.onrender.com/unlike`, { userId, bookId });
      setLikedBooks(likedBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error unliking book:', error);
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://images.freecreatives.com/wp-content/uploads/2015/03/old-book-paper-high-quality-hd-wallpaper-desktop-Old-Book-Paper-High-Quality-HD-Wallpaper-Desktop.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '70px',
        overflow: 'auto',
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Book Haven
          </Typography>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Button component={Link} to={'/'} sx={{ textDecoration: 'none', color: 'white', mr: 2 }}>
              Home
            </Button>
            <Button component={Link} to={'/Books'} sx={{ textDecoration: 'none', color: 'white', mr: 2 }}>
              Books
            </Button>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>P</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={proOpen}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={signUp}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, pb: 4, maxWidth: 'lg' }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
          Welcome, {user.firstName}!
        </Typography>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" gutterBottom>
                Profile and Info
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="right">
              {!editMode ? (
                <Button variant="contained" color="primary" onClick={handleEditProfile} startIcon={<EditIcon />}>
                  Edit
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleSaveProfile} startIcon={<EditIcon />}>
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={user.firstName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
                InputProps={{ style: { backgroundColor: editMode ? 'white' : 'transparent' } }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={user.lastName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
                InputProps={{ style: { backgroundColor: editMode ? 'white' : 'transparent' } }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Age"
                value={user.age}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
                InputProps={{ style: { backgroundColor: editMode ? 'white' : 'transparent' } }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="place"
                label="Place"
                value={user.place}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
                InputProps={{ style: { backgroundColor: editMode ? 'white' : 'transparent' } }}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                value={user.Email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
                InputProps={{ style: { backgroundColor: editMode ? 'white' : 'transparent' } }}
                sx={{ mb: 2 }}
              />
            </Grid> */}
          </Grid>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Button
              variant={selectedTab === 'liked' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSelectedTab('liked')}
              sx={{ mr: 2 }}
            >
              Liked Books
            </Button>
            <Button
              variant={selectedTab === 'rented' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSelectedTab('rented')}
            >
              Rented Books
            </Button>
          </Box>

          {selectedTab === 'liked' && (
            <>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Liked Books
              </Typography>
              <Grid container spacing={2}>
                {likedBooks.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imgurl}
                        alt={book.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.genre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.year}
                        </Typography>
                        {book.rented ? (
                          <Typography variant="body2" color="red">
                            Rented
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => handleRentBook(book._id)}
                          >
                            Rent
                          </Button>
                        )}
                        <IconButton
                          color="secondary"
                          onClick={() => handleUnlikeBook(book._id)}
                        >
                          <CancelIcon />
                        </IconButton>
                        <Typography variant='button'>Remove</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {selectedTab === 'rented' && (
            <>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Rented Books
              </Typography>
              <Grid container spacing={2}>
                {rentedBooks.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imgurl}
                        alt={book.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.genre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {book.year}
                        </Typography>
                        <Typography variant="button" color="red">
                          {book.rented ? 'Rented' : 'Available'}
                        </Typography>
                        {!book.rented && (
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => handleRentBook(book._id)}
                          >
                            Rent
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
