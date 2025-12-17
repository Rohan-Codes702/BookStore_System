import { port, MongoDBURL } from './config.js';
import mongoose from 'mongoose';
import express from 'express';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.use('/books', booksRoutes);

mongoose.connect(MongoDBURL)
  .then(() => {
    console.log("App is connected to Database");
    app.listen(port, () => {
      console.log(`App Running on : ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
