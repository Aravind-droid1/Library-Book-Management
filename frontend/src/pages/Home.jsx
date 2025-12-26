import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCard from "../components/home/BooksCard.jsx";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="space-y-6">
      {/* ===== TOP BAR ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Book Collection
        </h1>

        <Link to="/books/create">
          <button
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg
              bg-sky-600
              text-white
              hover:bg-sky-700
              transition
              shadow
            "
          >
            <MdOutlineAddBox className="text-2xl" />
            Add Book
          </button>
        </Link>
      </div>

      {/* ===== VIEW TOGGLE ===== */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowType("card")}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              showType === "card"
                ? "bg-sky-600 text-white shadow"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          Card View
        </button>

        <button
          onClick={() => setShowType("table")}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              showType === "table"
                ? "bg-sky-600 text-white shadow"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          Table View
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
