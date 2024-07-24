import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Georgia, serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightBold: 600,
  },
});

const Pay = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://library-ict-final-backend.onrender.com/book/${bookId}`);
        setBook(response.data);
        if (response.data.rented) {
          setIsPaid(true); // Set `isPaid` to true if the book is already rented
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
        setError(error.message);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleRent = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      // Fetch book details to check its rental status
      const bookResponse = await axios.get(`https://library-ict-final-backend.onrender.com/book/${bookId}`);
      const bookData = bookResponse.data;

      if (bookData.rented) {
        const renter = bookData.rentedBy ? bookData.rentedBy._id : 'Unknown';
        alert(`Book "${bookData.title}" is already rented by user ID: ${renter}`);
        return;
      }

      // Proceed to rent the book
      await axios.put(`https://library-ict-final-backend.onrender.com/update/book/${bookId}`, { rented: true, rentedBy: userId });
      
      // Update the user's rentedBooks list
      await axios.post(`https://library-ict-final-backend.onrender.com/rent-book/${userId}/${bookId}`);

      alert(`Payment for "${bookData.title}" processed successfully!`);
      setIsPaid(true);

      // Optional: Redirect or update the UI
      // navigate('/profile'); // Example redirection to profile page
    } catch (error) {
      console.error('Error marking book as rented:', error.response ? error.response.data : error.message);
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url("https://png.pngtree.com/background/20230525/original/pngtree-jane-read-library-with-anime-desk-picture-image_2736866.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <AppBar position="absolute" sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          width: '100%',
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
              <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          maxWidth={1200}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start"
          p={3}
          sx={{ mt: '50px' }}
        >
          <Card sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '50%',
          }}>
            <CardMedia
              component="img"
              height="400"
              image={book.imgurl}
              alt={book.title}
            />
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
            }}>
              <div>
                <Typography gutterBottom variant="h4" color="black" fontWeight='bold'>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="black" fontWeight='bold'>
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="black" fontWeight='bold'>
                  Year: {book.year}
                </Typography>
                <Typography variant="body2" color="black" fontWeight='bold'>
                  Genre: {book.genre}
                </Typography>
                <Typography variant="body2" color="black" fontWeight='bold'>
                  ISBN: {book.isbn}
                </Typography>
              </div>
              <Typography variant="h6" color="primary" style={{ marginTop: 20 }}>
                Price: INR {book.price}
              </Typography>
              
              {!isPaid && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleRent}
                  style={{ marginTop: 20 }}
                  color="primary"
                >
                  Pay Now
                </Button>
              )}
              {isPaid && (
                <Typography variant="body1" style={{ marginTop: 10 }}>
                  Rented For 30 days
                </Typography>
              )}
            </CardContent>
          </Card>

          <Box sx={{
            maxWidth: '40%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '20px',
            marginLeft: '20px',
          }}>
            {book.desc && (
              <Typography variant="button" fontWeightBold>
                Description: {book.desc}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            marginBottom:'15px'
          }}
        >
          <Typography variant="body2">
            <strong>Reminder:</strong> Books Will Be Instinctively Returned After The Due Date
          </Typography>
        </Box>
        
      </Box>
      
    </ThemeProvider>
  );
};

export default Pay;
