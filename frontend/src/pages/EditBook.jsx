import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  /* ===== FETCH BOOK ===== */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const book = response.data.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishedYear(book.publishedYear);
        setImage(book.image || "");
        setPreview(book.image || "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ===== UPDATE BOOK ===== */
  const handleEditBook = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishedYear", publishedYear);

    if (imageFile) formData.append("image", imageFile);
    else if (image) formData.append("image", image);

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, formData)
      .then(() => navigate("/"))
      .catch(() => alert("Failed to update book"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <BackButton />

      <h1 className="text-3xl font-semibold mb-6">Edit Book</h1>

      {loading && <Spinner />}

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* ===== IMAGE UPLOAD ===== */}
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
            const file = e.dataTransfer.files[0];
            if (!file || !file.type.startsWith("image/")) return;
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
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
              Drag & drop book cover here
            </p>
          )}
        </div>

        {/* ===== FORM GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-sky-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-sky-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Published Year
            </label>
            <input
              type="number"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-sky-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-sky-200"
            />
          </div>
        </div>

        {/* ===== ACTION ===== */}
        <button
          onClick={handleEditBook}
          className="
            w-full
            bg-sky-600 text-white
            py-2 rounded-lg
            hover:bg-sky-700 transition
            font-medium
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBook;
