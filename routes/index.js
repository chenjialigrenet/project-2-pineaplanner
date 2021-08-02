const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home.hbs', {
    style: 'stylesheets/style.css',
  });
});

//GET Recipes List page//
router.get('/recipes', (req, res, next) => {
  Recipe.find().then((dbRes) => {
    res.render('/recipes.hbs', {
      recipes: dbRes,
    });
  });
});

//GET One Recipe Page//
router.get('/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id).then((dbRes) => {
    res.render('oneRecipe.hbs', {
      Recipe: dbRes,
    });
  });
});

module.exports = router;
