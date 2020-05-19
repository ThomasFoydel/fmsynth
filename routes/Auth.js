const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const auth = require('../middlewares/auth');
// const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/register', async (req, res) => {
  console.log('REQ BODY: ', req.body);
  let { email, name, password, confirmpassword } = req.body;
  let allFieldsExist = email && name && password && confirmpassword;
  if (!allFieldsExist) {
    return res.send({ err: 'all fields required' });
  }

  if (password.length < 6) {
    return res.send({ err: 'Password must be at least 6 characters' });
  }
  if (name.length < 4 || name.length > 12) {
    return res.send({ err: 'Name must be between 4 and 12 characters' });
  }
  if (password !== confirmpassword) {
    return res.send({ err: 'Passwords do not match' });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.send({ err: 'Email input invalid' });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.send({ err: 'Profile with this email already exists' });
  }

  const hashedPw = await bcrypt.hash(password, 12);

  const newUser = new User({
    name: name,
    email: email.toLowerCase(),
    password: hashedPw,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (err) {
      return res.json({
        err:
          'Sorry, there is an issue with connecting to the database. We are working on fixing this.',
      });
    } else {
      if (!user) {
        return res.json({ err: 'No user found with this email' });
      }
      const passwordsMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordsMatch) {
        const token = jwt.sign(
          {
            tokenUser: {
              userId: user._id,
              email: user.email,
            },
          },
          process.env.SECRET,
          { expiresIn: '3hr' }
        );

        const userInfo = {
          age: user.age,
          city: user.city,
          name: user.name,
          email: user.email,
          profilePicId: user.profilePicId,
          coverPicId: user.coverPicId,
          _id: user._id,
        };

        res.json({
          status: 'success',
          message: 'Login successful',
          data: {
            user: userInfo,
            token,
          },
        });
      } else {
        return res.json({ err: 'Incorrect password' });
      }
    }
  });
});

module.exports = router;
