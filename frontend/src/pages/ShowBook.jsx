import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://library-book-management-h4hv.onrender.com/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />

      <h1 className="text-3xl font-semibold mb-6">Book Details</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

            {/* ===== IMAGE ===== */}
            <div className="flex justify-center">
              <img
                src={
                  book.image ||
                  "https://dummyimage.com/300x450/cccccc/000000&text=No+Image"
                }
                alt={book.title}
                loading="lazy"
                className="w-56 h-80 object-cover rounded-lg shadow"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";
                }}
              />
            </div>

            {/* ===== DETAILS ===== */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-xl font-semibold">{book.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Author</p>
                <p className="text-lg">{book.author}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Published Year</p>
                <p className="text-lg">{book.publishedYear}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Book ID</p>
                <p className="text-sm break-all text-gray-700">
                  {book._id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="text-sm text-gray-700">
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
