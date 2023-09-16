import 'dotenv/config'

export const PORT = 5555;

export const mongoDBURL =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@book-store-mern.1na9ld2.mongodb.net/books-collection?retryWrites=true&w=majority`
