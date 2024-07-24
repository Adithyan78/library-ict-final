import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography, IconButton, CardActionArea, CardActions, Button,
  Menu, MenuItem, AppBar, Toolbar, Grid, Box, Avatar, ListItemIcon, Divider, Tooltip, TextField
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const Books = () => {
  const [books, setBooks] = useState([]);
  const [userLikes, setUserLikes] = useState({}); // State to track if the user liked a book
  const [comments, setComments] = useState({}); // State to hold comments for each book
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRented, setIsRented] = useState({});
  const [favoritedBooks, setFavoritedBooks] = useState({});
  const [commentText, setCommentText] = useState('');
  const [expandedBookId, setExpandedBookId] = useState(null); // Track expanded book for comments
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/view/books")
      .then(res => {
        const initialRentedStatus = {};
        const initialFavoritedStatus = {};
        const initialComments = {};
        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};

        res.data.forEach((book) => {
          initialRentedStatus[book._id] = book.rented;
          initialComments[book._id] = []; // Initialize comments array for each book

          // Set favorited status based on storedLikes
          initialFavoritedStatus[book._id] = !!storedLikes[book._id];
        });

        setBooks(res.data);
        setIsRented(initialRentedStatus);
        setFavoritedBooks(initialFavoritedStatus);
        setComments(initialComments); // Set initial comments state
        setUserLikes(storedLikes); // Set initial user likes state
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signUp = () => {
    navigate('/Signup2');
  };

  const proOpen = () => {
    navigate('/Profile');
  };

  const handleLike = async (bookId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('User not authenticated');
        return;
      }

      const hasLiked = favoritedBooks[bookId];
      const endpoint = hasLiked ? 'http://localhost:3001/unlike' : 'http://localhost:3001/like';
      const response = await axios.post(endpoint, { userId, bookId });

      if (response.status === 200) {
        const updatedLikes = { ...userLikes,  };
        setUserLikes(updatedLikes);
        setFavoritedBooks({ ...favoritedBooks, [bookId]: !favoritedBooks[bookId] });

        // Update localStorage with new likes
        localStorage.setItem('likes', JSON.stringify(updatedLikes));

        alert(response.data.message); // Optional: Alert message from server response
      } else {
        alert('Failed to like/unlike the book. Please try again later.');
      }
    } catch (error) {
      console.error('Error liking/unliking book:', error);
      alert('book is alredy added to your favorites');
      navigate('/Profile');
    }
  };

  const handleCardClick = (bookId) => {
    navigate(`/Pay/${bookId}`);
  };

  const handleBuy = async (bookId) => {
    console.log(`handleBuy called for bookId: ${bookId}`);
    
    try {
      // Fetch book rental status
      const response = await axios.get(`http://localhost:3001/book/rental-status/${bookId}`);
      const { rented, rentedBy } = response.data;
  
      if (rented) {
        alert("This book is already rented.");
        return;
      }
  
      // Navigate to the Pay page if the book is not rented
      navigate(`/Pay/${bookId}`);
    } catch (error) {
      console.error('Error fetching book rental status:', error);
      alert('Error checking rental status. Please try again later.');
    }
  };

  const handleAddComment = async (bookId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('User not authenticated');
        return;
      }

      const response = await axios.post('http://localhost:3001/comment', {
        userId,
        bookId,
        text: commentText
      });

      if (response.status === 201) {
        const newComment = response.data.comment; // Assuming your backend returns the newly added comment
        const updatedComments = { ...comments };
        updatedComments[bookId] = [...updatedComments[bookId], newComment];
        setComments(updatedComments); // Update local state with the new comment
        setCommentText(''); // Clear comment text field
        alert(response.data.message);
      } else {
        alert('Failed to add comment. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again later.');
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentClick = (bookId) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId); // Toggle expanded state
  };

  const handleShowComments = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${bookId}`);
      const { comments } = response.data;
      // Update state or show comments in a modal/dialog
      console.log('Comments:', comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('Failed to fetch comments. Please try again later.');
    }
  };

  return (
    <div style={{ 
      backgroundImage: 'url("https://img.freepik.com/premium-vector/empty-wooden-shelf-background_43029-805.jpg")',
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      display: 'flex',
      minHeight: '100vh' 
    }}>
      <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
        <Toolbar>
          <Grid container alignItems='inherit'>
            <Typography variant="h6" component="div" fontWeight="bold">
              The Book Haven
            </Typography>
          </Grid>
          <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
            <Grid item sx={{ textAlign: 'right' }}>
              <Button component={Link} to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Home
              </Button>
              <Button component={Link} to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Logout
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div style={{ display: 'flex', justifyContent: 'initial', alignItems: 'initial', flexDirection: 'column', marginTop: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'normal', marginTop: -5 }}>
          {books.map((book, index) => (
            <Card key={index} sx={{ backgroundColor:'transparent',position: 'relative', maxWidth: 240, margin: 2, marginTop: 7, marginRight: '35px',transition: 'transform 0.2s ease-in-out', // Add transition
              '&:hover': {
                transform: 'scale(1.05)', // Add hover effect
              } }}>
              {/* <IconButton 
                sx={{ 
                  position: 'absolute', 
                  top: 5, 
                  right: 5, 
                  zIndex: 1, 
                  color: favoritedBooks[book._id] ? 'red' : 'white' 
                }} 
                onClick={() => handleLike(book._id)}
              >
                 <FavoriteIcon /> 
              </IconButton> */}
              <CardActionArea onClick={() => handleCardClick(book._id)}>
                <CardContent >
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.imgurl}
                    alt="Book Image"
                    sx={{ width: '100%', height: '45vh' }}
                  />
                  <Typography variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
                    Title: {book.title}
                  </Typography>
                  <Typography variant='h7' component='div' sx={{ fontWeight: 'bold' }}>
                    Author: {book.author}
                  </Typography>
                  <Typography variant='h7' component='div' sx={{ fontWeight: 'bold' }}>
                    Year: {book.year}
                  </Typography>
                  <Typography variant='h7' component='div' sx={{ fontWeight: 'bold' }}>
                    Genre: {book.genre}
                  </Typography>
                  <Typography variant='h7' component='div' sx={{ fontWeight: 'bold' }}>
                    ISBN: {book.isbn}
                  </Typography>
                  <Typography variant='h6' component='div' style={{ marginTop: 10, color: 'green', fontWeight: 'bold' }}>
                    Price: INR{book.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton sx={{ 
                 
                  color: favoritedBooks[book._id] ? 'red' : '-moz-initial' 
                }}  aria-label="like" onClick={() => handleLike(book._id)}>
                     <FavoriteIcon /> 
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {favoritedBooks[book._id] ? 'liked' : 'like'} 
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton aria-label="comment" onClick={() => handleCommentClick(book._id)}>
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {comments[book._id]?.length || 0} 
                  </Typography>
                </Box>
                <Button variant="contained" size="large" color="primary"  startIcon={<AddShoppingCartIcon />} onClick={() => handleBuy(book._id)}>
                  {isRented[book._id] ? "Rented" : "Rent"}
                </Button>
              </CardActions>
              {/* Display comments */}
              {expandedBookId === book._id && (
                <>
                  {comments[book._id]?.map((comment, commentIndex) => (
                    <CardContent key={commentIndex}>
                      <Typography variant="body2" color="text.secondary">
                        {comment && comment.text}
                      </Typography>
                    </CardContent>
                  ))}
                  {/* Add comment form */}
                  <CardContent>
                    <TextField
                      fullWidth
                      placeholder="Add a comment"
                      variant="outlined"
                      value={commentText}
                      onChange={handleCommentChange}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => handleAddComment(book._id)}>
                            <CommentIcon />
                          </IconButton>
                        )
                      }}
                    />
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
