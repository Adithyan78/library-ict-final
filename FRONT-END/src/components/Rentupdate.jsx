import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const Rentupdate = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/view/rented-books')
      .then(res => {
        setRentedBooks(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  // Function to handle updating rental status of a book
  const handleUpdateRentalStatus = (bookId, currentStatus) => {
    axios.put(`http://localhost:3001/update/book/${bookId}`, { rented: !currentStatus })
      .then(response => {
        const updatedBooks = rentedBooks.map(book => {
          if (book._id === bookId) {
            return { ...book, rented: !currentStatus }; // Toggle rented status
          }
          return book;
        });
        setRentedBooks(updatedBooks);
      })
      .catch(error => {
        console.error('Failed to update book rental status:', error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Rented Books and User Details
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {rentedBooks.map((book) => (
          <Card key={book._id} sx={{ maxWidth: 267, margin: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={book.imgurl}
              alt="Book Image"
            />
            <CardContent>
              <Typography variant='h6' component='div'>Title: {book.title}</Typography>
              <Typography variant='h6' component='div'>Author: {book.author}</Typography>
              <Typography variant='h6' component='div'>Year: {book.year}</Typography>
              <Typography variant='h6' component='div'>Genre: {book.genre}</Typography>
              <Typography variant='h6' component='div'>ISBN: {book.isbn}</Typography>
              <Typography variant='h6' component='div'>Price: INR {book.price}</Typography>
              <Typography variant='h6' component='div'>Rented By: {book.rentedByName}</Typography>
              <Typography variant='h6' component='div'>Rented Email: {book.rentedByEmail}</Typography>
              <Button
                onClick={() => handleUpdateRentalStatus(book._id, book.rented)}
                variant="contained"
                color={book.rented ? "secondary" : "primary"}
                sx={{ mt: 2 }}
              >
                {book.rented ? 'Mark as Available' : 'Mark as Rented'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rentupdate;
