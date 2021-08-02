const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

// GET home page //
router.get('/', (req, res, next) => {
  res.render('home.hbs');
});

//GET Planner page//
router.get('/planner', (req, res, next) => {
  res.render('planner.hbs');
});

//GET Recipes List page//
router.get('/recipes', (req, res, next) => {
  res.render('recipes.hbs');
  // Recipe.find()
  //   .then((dbRes) => {
  //     res.render('/recipes.hbs', {
  //       recipes: dbRes,
  //       style: ['style.css'],
  //     });
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

//GET One Recipe Page//
router.get('/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((dbRes) => {
      res.render('oneRecipe.hbs', {
        recipe: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//GET Login page//
router.get('/login', (req, res, next) => {
  res.render('login.hbs');
});

//GET Signup page//
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

//GET myplans page//
router.get('/myplans', (req, res, next) => {
  res.render('myplans.hbs');
});

//GET profile page//
router.get('/profile', (req, res, next) => {
  res.render('profile.hbs');
});

module.exports = router;
