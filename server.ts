const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,

    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
// endpoints
app.get("/", (req, res) => {
  res.send("Hello world");

});

app.post('/api/signup', async (req, res) => {
  try {
    // extract form data from request body
    const { username, email, password } = req.body;

    // check if the username already exists in the database


  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

})


//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in port${PORT}`);
});
