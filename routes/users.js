const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

//GET profile page//
router.get('/users/profile', (req, res, next) => {
  User.findById(req.session.currentUserId)
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
  User.findByIdAndUpdate(req.session.currentUserId, req.body)
    .then(() => {
      res.redirect('/users/profile');
    })
    .catch((err) => next(err));
});

router.get('/users/profile/edit', (req, res, next) => {
  User.findById(req.session.currentUserId).then((dbRes) => {
    res
      .render('profileEdit.hbs', {
        user: dbRes,
        style: ['profile.css'],
      })
     
  }) .catch((err) => next(err));;
});

module.exports = router;
