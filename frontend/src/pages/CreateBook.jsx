import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ===================== FIX DRAG & DROP ===================== */
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);

    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  /* ===================== SAVE BOOK ===================== */
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishedYear,
      image,
    };

    setLoading(true);
    axios
      .post("https://library-book-management-h4hv.onrender.com", data)
      .then(() => navigate("/"))
      .catch(() => alert("Failed to create book"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <BackButton />

      <h1 className="text-3xl font-semibold mb-6">Create Book</h1>

      {loading && <Spinner />}

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* ===================== DRAG & DROP ===================== */}
        <div
          className="
            border-2 border-dashed border-gray-300
            rounded-lg p-6
            text-center cursor-pointer
            hover:border-sky-400 transition
          "
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();

            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
              alert("Please drop an image file");
              return;
            }

            setImageFile(file);
            setPreview(URL.createObjectURL(file));
            console.log("Dropped file:", file);
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-56 object-cover mx-auto rounded-lg shadow"
            />
          ) : (
            <p className="text-gray-500">
              Drag & drop book cover here (preview only)
            </p>
          )}
        </div>

        {/* ===================== FORM ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full border border-gray-300
                rounded-lg px-4 py-2
                focus:ring-2 focus:ring-sky-200
                focus:border-sky-400
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="
                w-full border border-gray-300
                rounded-lg px-4 py-2
                focus:ring-2 focus:ring-sky-200
                focus:border-sky-400
              "
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Published Year
            </label>
            <input
              type="number"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="
                w-full border border-gray-300
                rounded-lg px-4 py-2
                focus:ring-2 focus:ring-sky-200
                focus:border-sky-400
              "
            />
          </div>
        </div>

        {/* ===================== IMAGE URL ===================== */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Image URL (this will be saved)
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://covers.openlibrary.org/..."
            className="
              w-full border border-gray-300
              rounded-lg px-4 py-2
              focus:ring-2 focus:ring-sky-200
              focus:border-sky-400
            "
          />
        </div>

        {/* ===================== ACTION ===================== */}
        <button
          onClick={handleSaveBook}
          className="
            w-full bg-sky-600 text-white
            py-2 rounded-lg
            hover:bg-sky-700 transition
            font-medium
          "
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
