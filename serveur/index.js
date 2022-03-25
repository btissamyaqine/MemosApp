import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
// const mongoose = pkg;
// var cors = require('cors');
 
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
// connect the database

app.use('/posts', postRoutes);
// const CONNECTION_URL = 'mongodb+srv://MERN-Stack:btissam123@cluster0.rppsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`)))
  .catch((error) => console.log(error.message));
  // .catch((error) => console.log(`${error} did not connect`));


  // mongoose.set('useFindAndModify', false);




