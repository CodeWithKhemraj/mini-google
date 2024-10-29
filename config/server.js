const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Serve static files from the 'public' directory
app.use("/add-data", require("../scr/routes/test"));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
