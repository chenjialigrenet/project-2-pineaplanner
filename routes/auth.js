const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const bcrypt = require('bcryptjs');
const SALT = 10;

// SIGN UP ROUTES
router.get('/signup', (req, res, next) => {
  res.render('signup', { style: ['signInUp.css'] });
});

router.post('/signup', async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.email || !data.password || !data.userName)
      throw new Error({ status: 'error', text: 'All fields required' });

    const alreadyExist = await User.findOne({ email: data.email });

    if (alreadyExist)
      throw new Error({ status: 'error', text: 'Email already exists' });

    const salt = bcrypt.genSaltSync(SALT);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    data.password = hashedPassword;

    const newUser = await User.create(data);

    res.redirect('login');
    console.log('New user created', newUser); //Just to test if the user is created, delete this line after the test
  } catch (error) {
    console.log(error); //To know what the error is, to delete when everything is working fine
    res.render('signup', {
      msg: { status: error.status, text: error.text },
      style: ['signInUp.css'],
    });
  }
});

//SIGN IN ROUTES
router.get('/login', (req, res, next) => {
  res.render('login', { style: ['signInUp.css'] });
});

router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) throw new Error({ status: 204, text: 'Wrong credentials !' });

    req.session.currentUser = user;
    console.log(req.session.currentUser);
    res.redirect('/users/profile');
  } catch (error) {
    console.log(error); //Checking what the error is (delete this line)
    res.render('login', {
      msg: { status: error.status, text: error.text },
      style: ['signInUp.css'],
    });
  }
});

// LOG OUT ROUTE
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect('/');
  });
});

module.exports = router;
