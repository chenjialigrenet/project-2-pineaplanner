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
  Plan.create()
    .then((newPlan) => {
      res.render('planner.hbs', {
        style: ['mealPlannerStyle.css'],
        plan: newPlan,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET Recipes List page//
router.get('/recipes', async (req, res, next) => {
  try {
    const foundRecipes = await Recipe.find();
    const dishTypes = [];

    foundRecipes.forEach((recipe) => {
      let dishTypeLocal = recipe.dishTypes;

      dishTypeLocal.forEach((type) => {
        if (!dishTypes.includes(type)) {
          dishTypes.push(type);
        }
      });
    });
    
    let firsPageRecipes=foundRecipes.slice(0,50);

    res.render('recipes.hbs', {
      recipes: firsPageRecipes,
      dishTypes: dishTypes,
      style: ['recipesStyle.css'],
    });
  } catch (err) {
    next(err);
  }
});

//GET One Recipe Page//
router.get('/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((dbRes) => {
      console.log(req.params.id);
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
