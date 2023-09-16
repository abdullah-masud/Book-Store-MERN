import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import bookRoutes from './routes/booksRoutes.js'
import cors from 'cors'

const app = express()

//middleware
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Welcome to Book Store')
})

app.use('/books', bookRoutes)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App Connected to Database')
        app.listen(PORT, () => {
            console.log(`Book Store listening on port ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(error)
    })

