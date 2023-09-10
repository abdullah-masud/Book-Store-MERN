import express from "express"
import { BookModel } from "../models/bookModels.js";

const router = express.Router();

// Route for saving a new book in database
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: 'Send all required fields: Title, Author, PublishYear' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await BookModel.create(newBook)

        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for getting all books from database
router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for getting single book from database by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findById(id)
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for Updating Book in database
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields: Title, Author, PublishYear' })
        }

        const { id } = req.params;
        const updatedBook = await BookModel.findByIdAndUpdate(id, req.body)

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book Not Found' })
        }
        return res.status(200).send({ message: 'Book Updated Successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for Deleting Book from database
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await BookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            // If the book is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book Deleted Successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


export default router