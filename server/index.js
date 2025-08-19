// index.js
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://thagreatjoel:fW9Hu0QMBhVrknLe@wellness.p5synkn.mongodb.net/?retryWrites=true&w=majority&appName=Wellness"; 
// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Server is running...");
});

//
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});