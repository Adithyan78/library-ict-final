const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user'); // Ensure path is correct
const Book = require('./model/book'); // Ensure path is correct
const EventEmitter = require('events');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (assuming ./connection sets up mongoose connection)
require('./connection'); // Ensure this file properly sets up the connection

// Login endpoint
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (Email === "admin@gmail.com") {
      const adminUser = await User.findOne({ Email });
      if (adminUser && adminUser.Password === Password) {
        res.json("admin");
      } else {
        res.status(401).json("Invalid credentials");
      }
    } else {
      const regularUser = await User.findOne({ Email });
      if (regularUser && regularUser.Password === Password) {
        res.json({ status: "success", user: { id: regularUser._id } });
      } else {
        res.status(401).json("Invalid credentials");
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json("Server error. Please try again later.");
  }
});

// Add user endpoint
app.post('/add/user', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "User account signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to add user" });
  }
});

// Add book endpoint
app.post('/add/book', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).send({ message: "Book added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to add book" });
  }
});

// View all users endpoint
app.get('/view/users', async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

// View all books endpoint
app.get('/view/books', async (req, res) => {
  try {
    const data = await Book.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
});

// Delete user endpoint
app.delete('/remove/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete user" });
  }
});

// Delete book endpoint
app.delete('/remove/book/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete book" });
  }
});

// Update user endpoint
app.put('/edit/user/:id', async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ message: 'User update successful', data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update user" });
  }
});

// Update book endpoint
app.put('/edit/book/:id', async (req, res) => {
  try {
    const data = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ message: 'Book update successful', data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update book" });
  }
});
// Fetch books rented by a specific user
app.get('/user/:userId/rented-books', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).populate('rentedBooks'); // Assuming rentedBooks is an array of book IDs

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the books rented by the user
    const books = await Book.find({ _id: { $in: user.rentedBooks } });
    
    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Add other user details you want to display
      },
      books
    });
  } catch (error) {
    console.error('Failed to fetch rented books for user:', error);
    res.status(500).json({ message: 'Failed to fetch rented books' });
  }
});
// Update book rental status
app.put('/update/book/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Toggle the rented status
    book.rented = !book.rented;
    await book.save();

    res.status(200).json({
      message: 'Book rental status updated successfully',
      rented: book.rented // Return the updated rental status
    });
  } catch (error) {
    console.error('Failed to update rental status:', error);
    res.status(500).json({ message: 'Failed to update rental status' });
  }
});

// Fetch user profile by ID endpoint
app.get('/user/:id', async (req, res) => {
  try {
    const userProfile = await User.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send({ message: "Failed to fetch user profile" });
  }
});

// Fetch book by ID endpoint
app.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findById(req.params.id);
    if (!bookData) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).json(bookData);
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
});

// Update rented status of a book by ID
// Update book's rental status
app.put('/update/book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rented, rentedBy } = req.body; // Expecting rented status and rentedBy userId

    // Validate input
    if (typeof rented !== 'boolean' || !bookId || !rentedBy) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Find and update the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.rented = rented;
    book.rentedBy = rentedBy; // Assuming rentedBy is a userId or user object
    await book.save();

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Like a book
app.post('/like', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid userId or bookId' });
    }

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (user.likedBooks.includes(bookId)) {
      return res.status(400).json({ message: 'Book already liked' });
    }

    user.likedBooks.push(bookId);
    book.likes.push(userId);

    await Promise.all([user.save(), book.save()]);

    res.status(200).json({ message: 'Book liked successfully' });
  } catch (error) {
    console.error('Error liking book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/unlike', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid userId or bookId' });
    }

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!user.likedBooks.includes(bookId)) {
      return res.status(400).json({ message: 'Book not liked yet' });
    }

    user.likedBooks.pull(bookId);
    book.likes.pull(userId);

    await Promise.all([user.save(), book.save()]);

    res.status(200).json({ message: 'Book unliked successfully' });
  } catch (error) {
    console.error('Error unliking book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Clear all likes endpoint
app.delete('/clear-likes', async (req, res) => {
  try {
    await User.updateMany({}, { $set: { likedBooks: [] } });
    await Book.updateMany({}, { $set: { likes: [] } });
    res.status(200).json({ message: 'All likes cleared successfully.' });
  } catch (error) {
    console.error('Error clearing likes:', error);
    res.status(500).json({ message: 'Failed to clear likes.' });
  }
});

// Add a comment to a book
app.post('/comment', async (req, res) => {
  try {
    const { userId, bookId, text } = req.body;

    const bookComment = await Book.findById(bookId);
    if (!bookComment) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newComment = { user: userId, text };
    bookComment.comments.push(newComment);

    await bookComment.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment. Please try again later.' });
  }
});

// Get all comments for a book
app.get('/comments/:bookId', async (req, res) => {
  try {
    const bookComments = await Book.findById(req.params.bookId);
    if (!bookComments) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ comments: bookComments.comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});
app.get('/liked-books/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('likedBooks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ likedBooks: user.likedBooks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// app.get('/rented-books/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).populate('rentedBooks');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ rentedBooks: user.rentedBooks });
//   } catch (error) {
//     console.error('Error fetching rented books:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Endpoint to get book rental status
app.get('/book/rental-status/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ rented: book.rented, rentedBy: book.rentedBy });
  } catch (error) {
    console.error('Error fetching book rental status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/rented-books/:userId', async (req, res) => {
  try {
    console.log('Fetching user with ID:', req.params.userId); // Log user ID
    const user = await User.findById(req.params.userId).populate('rentedBooks');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Rented books:', user.rentedBooks); // Log rented books
    res.json({ rentedBooks: user.rentedBooks });
  } catch (error) {
    console.error('Error fetching rented books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Add a book to the rentedBooks list
app.post('/rent-book/:userId/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    // Validate input
    if (!userId || !bookId) {
      return res.status(400).json({ message: 'Invalid userId or bookId' });
    }

    // Find user and book
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Add book to user's rentedBooks list
    if (!user.rentedBooks.includes(bookId)) {
      user.rentedBooks.push(bookId);
      await user.save();
    }

    res.status(200).json({ message: 'Book added to rentedBooks', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Initialize EventEmitter
const busEmitter = new EventEmitter();
busEmitter.setMaxListeners(20); // Increase as needed

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
