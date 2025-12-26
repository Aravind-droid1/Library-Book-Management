import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDB_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

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
