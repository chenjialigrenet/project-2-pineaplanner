const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

// GET home page //
router.get('/', (req, res, next) => {
  res.render('home.hbs', {
    style: ['home.css'],
  });
});

//GET Planner page//
router.get('/planner', (req, res, next) => {
  res.render('planner.hbs', {
    style: ['mealPlannerStyle.css'],
  });
});

//GET Recipes List page//
router.get('/recipes', (req, res, next) => {

  Recipe.find()
  .then((dbRes) => {
    res.render('recipes.hbs', {
      recipes: dbRes,
      style: ['recipesStyle.css'],
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
        recipe: dbRes,
        style: ['oneRecipeStyle.css'],
      });
    })
    .catch((err) => {
      next(err);
    });
});

//GET myplans page//
router.get('/myplans', (req, res, next) => {
  res.render('myplans.hbs', {
    style: ['myPlansStyle.css'],
  });
});

//GET profile page//
router.get('/profile', (req, res, next) => {
  res.render('profile.hbs', {
    style: ['profile.css'],
  });
});

module.exports = router;
