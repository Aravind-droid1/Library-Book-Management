import express from "express";
import Book from "../models/bookModel.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ===================== CREATE BOOK ===================== */
/* Supports drag & drop image upload OR image URL */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author, publishedYear, image } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        message: "Title, Author and Published Year are required",
      });
    }

    let imageUrl;

    if (req.file) {
      imageUrl = `http://localhost:5555/uploads/${req.file.filename}`;
    } else if (image) {
      imageUrl = image;
    } else {
      imageUrl =
        "https://dummyimage.com/200x300/cccccc/000000&text=No+Image";
    }

    const newBook = await Book.create({
      title,
      author,
      publishedYear,
      image: imageUrl,
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/* ===================== GET ALL BOOKS ===================== */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/* ===================== GET BOOK BY ID ===================== */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ data: book });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/* ===================== UPDATE BOOK ===================== */
/* Supports updating image URL or uploading new image */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `http://localhost:5555/uploads/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/* ===================== DELETE BOOK ===================== */
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
