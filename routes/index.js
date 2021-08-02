const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

// GET home page //
router.get('/', (req, res, next) => {
  res.render('home.hbs', {
    style: ['style.css'],
  });
});

//GET Recipes List page//
router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .then((dbRes) => {
      res.render('/recipes.hbs', {
        recipes: dbRes,
        style: ['style.css'],
      });
    })
    .catch((err) => {
      next(err);
    });
});

//GET One Recipe Page//
router.get('/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((dbRes) => {
      res.render('oneRecipe.hbs', {
        Recipe: dbRes,
        style: ['style.css'],
      });
    })
    .catch((err) => {
      next(err);
    });
});

//GET Login page//
router.get('/login', (req, res, next) => {
  res.render('login.hbs', {
    style: ['style.css'],
  });
});

//GET Signup page//
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs', {
    style: ['style.css'],
  });
});

//GET myplans page//
router.get('/myplans', (req, res, next) => {
  res.render('myplans.hbs', {
    style: ['style.css'],
  });
});

//GET profile page//
router.get('/profile', (req, res, next) => {
  res.render('profile.hbs', {
    style: ['style.css'],
  });
});

module.exports = router;
