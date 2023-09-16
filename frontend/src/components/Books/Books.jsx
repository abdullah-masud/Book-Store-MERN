import { useEffect, useState } from "react";
import Axios from "axios";
import Book from "./Book";
import AddBook from "../AddBook/AddBook";
import UpdateBook from "../UpdateBook/UpdateBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState(null);
  useEffect(() => {
    const getBooks = async () => {
      const { data } = await Axios.get("http://localhost:5555/books");
      setBooks(data);
    };
    getBooks();
  }, [books]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center     ">
        <AddBook />
      </div>
      <div className="  my-14 ">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Author</th>
                <th>Book Title</th>
                <th>Publish Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books?.data
                ?.map((book) => (
                  <Book key={book._id} book={book} setBookInfo={setBookInfo} />
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
      {bookInfo && <UpdateBook bookInfo={bookInfo} />}
    </div>
  );
};

export default Books;
