const express = require('express');
const blogRoute = require('./blog');

const router = express.Router();

// Import blog route

// Use blog route
router.use('/blog', blogRoute);

module.exports = router;