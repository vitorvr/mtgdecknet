const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please inform right values' });
  }

  User.findOne({ email }).then(user => {
    if (user) res.status(400).json({ message: 'User already exists' });

    const newUser = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('secret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
