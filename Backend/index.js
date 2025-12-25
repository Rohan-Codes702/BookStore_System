import { port, MongoDBURL } from './config.js';
import mongoose from 'mongoose';
import express from 'express';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// ===== API Routes =====
app.use('/books', booksRoutes);

// ===== Serve React Frontend in Production =====
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist"))); // <- change build -> dist

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html")); // <- same here
  });
}


// ===== Connect to MongoDB and Start Server =====
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
