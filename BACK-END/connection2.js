const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI2)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
