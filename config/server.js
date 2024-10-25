const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use("/add-data", require("../scr/routes/test"));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
