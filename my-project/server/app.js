
/* globals process */

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

// Import environment variables
dotenv.config({
  path: './env',
});

const app = express();

// Connect to MongoDB
connectDB()
  // start server
  .then(() => {
    app.on('error', (error) => {
      console.log('Error:', error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection faild !!!', error);
  });
