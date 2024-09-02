const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());

// endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in port${PORT}`);
});
