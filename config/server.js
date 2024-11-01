const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html from the public directory
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
