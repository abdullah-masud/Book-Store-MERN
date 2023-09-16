/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const UpdateBook = ({ bookInfo }) => {
  // const { author, title, publishYear } = bookInfo;
  const {
    author: initialAuthor,
    title: initialTitle,
    publishYear: initialPublishYear,
  } = bookInfo;

  const [author, setAuthor] = useState(initialAuthor);
  const [title, setTitle] = useState(initialTitle);
  const [publishYear, setPublishYear] = useState(initialPublishYear);

  // const { register, handleSubmit } = useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    // Reset the state variables when the modal is opened
    setAuthor(initialAuthor);
    setTitle(initialTitle);
    setPublishYear(initialPublishYear);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookInfo = {
      author: author,
      title: title,
      publishYear: publishYear,
    };
    try {
      const updatedBook = await axios.put(
        `http://localhost:5555/books/${bookInfo._id}`,
        updatedBookInfo
      );

      if (updatedBook.status === 200) {
        toast("Book updated successfully!");
        setModalOpen(false);
      } else {
        toast("An error occurred while updating the book.");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <div className="">
      <input
        type="checkbox"
        id="update-book-modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={modalOpen ? handleModalClose : handleModalOpen}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="update-book-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-xl mb-5 text-center">Update Book</h3>
          <form onSubmit={handleSubmit} className="text-center">
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Author Name
              </span>
            </div>
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input input-bordered w-full max-w-md mb-5"
              // {...register("author", { required: true, maxLength: 20 })}
            />
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Book Title
              </span>
            </div>
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full max-w-md mb-5"
              // {...register("title", { required: true, maxLength: 20 })}
            />
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Publish Year
              </span>
            </div>
            <input
              type="number"
              placeholder="Publish Year"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="input input-bordered w-full max-w-md mb-5"
              // {...register("publishYear", { required: true, maxLength: 20 })}
            />

            <input type="submit" value="Update Book" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
