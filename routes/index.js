const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();
require('dotenv').config();
const itemPerPageVar = process.env.RECIPE_PER_PAGE;

// GET home page //
router.get('/', async (req, res, next) => {
  Recipe.find().then((result) => {
    
    res.render('home.hbs', {
      style: ['home.css'],
      recipes: result,
    });
  }).catch((err) => {
    console.log(err)
  })
  
});

//GET Recipes List page//
router.get('/recipes', async (req, res, next) => {
  try {
    const foundRecipes = await Recipe.find().sort({ title: 1 });
    const dishTypes = [];

    foundRecipes.forEach((recipe) => {
      let dishTypeLocal = recipe.dishTypes;

      dishTypeLocal.forEach((type) => {
        if (!dishTypes.includes(type)) {
          dishTypes.push(type);
        }
      });
    });

    let firsPageRecipes = foundRecipes.slice(0, itemPerPageVar);
    let maxPage = Math.ceil(foundRecipes.length / itemPerPageVar);

    res.render('recipes.hbs', {
      recipes: firsPageRecipes,
      dishTypes: dishTypes,
      style: ['recipesStyle.css'],
      scripts: ['recipesPageScript.js'],
      allPages: maxPage,
    });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
