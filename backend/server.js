const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3041;

// MongoDB connection URI
const mongoURI = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Import the router

// Use the router