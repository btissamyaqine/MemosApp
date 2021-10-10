import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = Express();

app.use('/posts', postRoutes)
 
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
// http://www.mongodb.com/cloud/atlas
// connect the database
const CONNECTION_URL = 'mongodb+srv://MERN-Stack:SNV%40btissam123@cluster0.rppsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);



