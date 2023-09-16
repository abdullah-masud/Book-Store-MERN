import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [modalOpen, setModalOpen] = useState();

  const onSubmit = async (bookData) => {
    // console.log(bookData);
    const response = await axios.post(`http://localhost:5555/books`, bookData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      toast("Book added successfully!");
      setModalOpen(false);
      reset();
    } else if (response.status === 200) {
      toast("Book already exists.");
    } else {
      toast("An error occurred while adding the book.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <label
          htmlFor="add-book-modal"
          className="btn btn-outline "
          onClick={() => setModalOpen()}
        >
          Add New Book
        </label>
      </div>
      <input
        type="checkbox"
        id="add-book-modal"
        className="modal-toggle"
        checked={modalOpen}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="add-book-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-xl mb-5 text-center">Add New Book</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Author Name
              </span>
            </div>
            <input
              type="text"
              placeholder="Author Name"
              className="input input-bordered w-full max-w-md mb-5"
              {...register("author", { required: true, maxLength: 20 })}
            />
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Book Title
              </span>
            </div>
            <input
              type="text"
              placeholder="Book Title"
              className="input input-bordered w-full max-w-md mb-5"
              {...register("title", { required: true, maxLength: 20 })}
            />
            <div className="text-start ml-4">
              <span className="label-text text-gray-400 font-semibold">
                Publish Year
              </span>
            </div>
            <input
              type="number"
              placeholder="Publish Year"
              className="input input-bordered w-full max-w-md mb-5"
              {...register("publishYear", { required: true, maxLength: 20 })}
            />

            <input type="submit" value="ADD Book" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
