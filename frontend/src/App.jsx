import { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  console.log(books?.data?.length);
  useEffect(() => {
    const getBooks = async () => {
      const { data } = await Axios.get("http://localhost:5555/books");
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <div>
      <h2 className="bg-red-400 text-white">{books.data.length}</h2>
    </div>
  );
};

export default App;
