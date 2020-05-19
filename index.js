const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join((__dirname = 'client/build/index.html')));
  });
}

// build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.post('/register', async (req, res) => {
  console.log('REQ BODY: ', req.body);
  // const newUser = new User({...req.body});
  // newUser.save()
  res.send({ message: 'great job' });
});

app.post('/login', (req, res) => {
  console.log('REQ BODY: ', req.body);
  res.send({ message: 'great job' });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}!`);
    });
  });
