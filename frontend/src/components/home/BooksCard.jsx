import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((item) => (
        <div
          key={item._id}
          className="
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            transform
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          {/* ===== IMAGE ===== */}
          <div className="relative overflow-hidden group">
            <img
              src={item.image}
              alt={item.title}
              className="
                w-full
                h-56
                object-cover
                transition-transform
                duration-300
                group-hover:scale-110
              "
              onError={(e) => {
                e.target.src =
                  "https://dummyimage.com/400x600/cccccc/000000&text=No+Image";
              }}
            />
            <span
              className="
                absolute
                top-3
                right-3
                bg-black/70
                text-white
                text-sm
                px-3
                py-1
                rounded-full
              "
            >
              {item.publishedYear}
            </span>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <PiBookOpenTextLight className="text-xl text-sky-600" />
              <h2 className="font-semibold text-lg truncate">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <BiUserCircle className="text-xl" />
              <span className="text-sm truncate">{item.author}</span>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className="text-xl text-green-600 hover:scale-110 transition" />
            </Link>

            <Link to={`/books/edit/${item._id}`}>
              <AiOutlineEdit className="text-xl text-yellow-600 hover:scale-110 transition" />
            </Link>

            <Link to={`/books/delete/${item._id}`}>
              <MdOutlineDelete className="text-xl text-red-600 hover:scale-110 transition" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
