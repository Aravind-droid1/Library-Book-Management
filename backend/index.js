import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5555;
const mongoDB_URL = process.env.MONGODB_URL;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== ROUTES ===================== */
app.use("/books", booksRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  return res.status(200).send("Book Store API is running");
});

/* ===================== DATABASE + SERVER ===================== */
mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
