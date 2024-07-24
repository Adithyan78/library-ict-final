// var express = require('express');
// var cors = require('cors');
// require('./connection')

// const book = require('./model/book'); // Correct import
// const bookmodel = require('./model/book');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());


// app.post('/add', async (req, res) => {
//     try {
//         console.log(req.body); // Logging the incoming request body
//         const newBook = new book(req.body); // Creating a new instance of user model
//         await newBook.save(); // Saving the new user to the database
//         res.status(201).send({ message: "book added successfull" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Failed to add book" });
//     }
// });


// app.get('/view',async(req,res)=>{
//     try{
//         const data = await user.find();
//         res.send(data);

//     }catch (error){
//         console.log(error)
//     }
// }) 




// // app.listen(3002,()=>{
// //     console.log("port is up and running")

// //  })

