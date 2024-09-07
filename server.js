import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();



const PORT = process.env.PORT || 5000;
const MONOGOURL = process.env.MONGO_URI

mongoose
  .connect(MONOGOURL)
  .then(() => {
    console.log('Database is connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  }).catch((err) => {
    console.log(err)
  })


// Middleware
app.use(express.json());

// MongoDB Connection


// Call the connectDB function to establish the connection


// Endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.post("/api/signup", async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the username or email already exists in the database
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

  
//     // Create a new user
//     user = new User({
//       username,
//       email,
//       password,
//     });

//     // Save the user to the database
//     await user.save();

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (error) {
//     console.error(`Error: ${(error as Error).message}`);
//     res.status(500).send("Server error");
//   }
// });

// Start the server

