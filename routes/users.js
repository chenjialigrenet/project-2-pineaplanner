const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

/////////STILL A LOT OF PROBLEMS OF PROFILE PAGE/////////
//GET profile page//
router.get('/users/profile', (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((dbRes) => {
      res.render('profile.hbs', {
        user: dbRes,
        style: ['profile.css'],
      });
    })
    .catch((err) => {
      next(err);
    });
});

// //Edit profile page//
router.post('/users/profile/edit', (req, res, next) => {
  User.findByIdAndUpdate(req.session.currentUser._id, req.body)
    .then(() => {
      res.redirect('/users/profile');
    })
    .catch((err) => next(err));
});

router.get('/users/profile/edit', (req, res, next) => {
  User.findById(req.session.currentUser._id).then((dbRes) => {
    res
      .render('profileEdit.hbs', {
        user: dbRes,
      })
      .catch((err) => next(err));
  });
});

module.exports = router;
