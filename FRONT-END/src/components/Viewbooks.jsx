import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActionArea, Button, CardMedia, IconButton, Box, AppBar, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';

const Viewbooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch books data on component mount
  useEffect(() => {
    axios.get("http://localhost:3001/view/books")
      .then(res => {
        setBooks(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);


  const clearLikes = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/clear-likes');
      alert(response.data.message); // Optional: Alert message from server response
      localStorage.removeItem('likes'); // Clear likes from localStorage on success
    } catch (error) {
      console.error('Error clearing likes:', error);
      alert('Failed to clear likes. Please try again later.');
    }
  };

  // Function to handle updating rental status of a book
  const handleRentStatusUpdate = (bookId) => {
    axios.put(`http://localhost:3001/update/book/${bookId}`)
      .then(response => {
        const updatedBooks = books.map(book => {
          if (book._id === bookId) {
            return { ...book, rented: !book.rented }; // Toggle rented status
          }
          return book;
        });
        setBooks(updatedBooks);
      })
      .catch(error => {
        console.error('Failed to update book rental status:', error);
      });
  };

  // Function to delete a book
  const delValue = (id) => {
    axios.delete(`http://localhost:3001/remove/book/${id}`)
      .then((res) => {
        alert(res.data.message);
        setBooks(books.filter(book => book._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Function to navigate to update book page
  const updateValue = (book) => {
    navigate("/Addbook", { state: { val: book } });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      
      <Box >
        <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Book Haven
            </Typography>
            <Button component={Link} to={'/'} style={{ textDecoration: "none", color: "white" }}>Home</Button>
            <Button component={Link} to={'/'} style={{ textDecoration: "none", color: "white" }}>Logout</Button>
            <Button onClick={clearLikes}>Clear  Likes</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <IconButton color="primary" aria-label="add book">
          <AddIcon />
        </IconButton>
        <Button variant="contained" color="primary" component={Link} to={'/Addbook'} style={{ textDecoration: "none", color: "white" }}>
          Add a Book
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'initial', alignItems: 'initial', flexDirection: 'column', marginTop: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'normal', marginTop: 10 }}>
          {books.map((book) => (
            <Card key={book._id} sx={{ maxWidth: 267, margin: 2 }}>
              <CardActionArea>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.imgurl}
                    alt="Book Image"
                    sx={{ width: '100%', height: '55vh' }}
                  />
                  <Typography variant='h6' component='div'>Title: {book.title}</Typography>
                  <Typography variant='h6' component='div'>Author: {book.author}</Typography>
                  <Typography variant='h6' component='div'>Year: {book.year}</Typography>
                  <Typography variant='h6' component='div'>Genre: {book.genre}</Typography>
                  <Typography variant='h6' component='div'>ISBN: {book.isbn}</Typography>
                  <Typography variant='h6' component='div'>Price: INR {book.price}</Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button onClick={() => delValue(book._id)} variant="contained" color="error" sx={{ mt: 2 }}>
                      Delete
                    </Button>
                    <Button onClick={() => updateValue(book)} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Update
                    </Button>
                    <Button onClick={() => handleRentStatusUpdate(book._id)} variant="contained" color={book.rented ? "secondary" : "primary"} sx={{ mt: 2 }}>
                      {book.rented ? 'Return' : 'Rent'}
                    </Button>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewbooks;
