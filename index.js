const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
const mongoURI = config.get('mongoURI');

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/deck', require('./routes/api/decks'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
