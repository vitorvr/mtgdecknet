const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
const db = config.get('mongoURI');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/deck', require('./routes/api/decks'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listenning on port ${port}...`));
