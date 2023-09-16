/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ book, setBookInfo }) => {
  const { _id, author, title, publishYear } = book;

  const handleDeleteBook = async (_id) => {
    const isDeleted = await axios.delete(`http://localhost:5555/books/${_id}`);
    if (isDeleted?.status === 200) {
      toast("Book deleted successfully!");
    } else {
      toast("An error occurred while deleting the book.");
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{author}</div>
          </div>
        </div>
      </td>
      <td>{title}</td>
      <td>{publishYear}</td>
      <th className=" lg:flex justify-center ">
        <label
          onClick={() => setBookInfo(book)}
          htmlFor="update-book-modal"
          className="btn btn-outline btn-accent md:mr-2 mb-2"
        >
          Update Book
        </label>
        <a
          onClick={() => handleDeleteBook(_id)}
          href="#_"
          className="btn btn-outline btn-error"
        >
          Delete Book
        </a>
      </th>
    </tr>
  );
};

export default Book;
