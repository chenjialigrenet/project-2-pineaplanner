const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();
require('dotenv').config();
const itemPerPageVar = process.env.RECIPE_PER_PAGE;

// GET home page //
router.get('/', (req, res, next) => {
  res.render('home.hbs', {
    style: ['home.css'],
  });
});

//GET Planner page//
router.get('/planner',  (req, res, next) => {
   Recipe.find().then((dbRes) => {
    res.render('planner.hbs', {
      style: ['mealPlannerStyle.css'],
      recipes: dbRes
      // plan: newPlan,
    });
  })
  
});

//GET myplans page//
router.get('/myplans', (req, res, next) => {
  res.render('myplans.hbs', {
    style: ['myPlansStyle.css'],
  });
});

//GET Recipes List page//
router.get('/recipes', async (req, res, next) => {
  try {
    const foundRecipes = await Recipe.find().sort({title:1});
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

router.post('/create-planner', async (req, res, next) => {
  data = req.body.recipes
  return Plan.create({recipes: data})
  .then((newPlan) => {
    newPlan.recipes.forEach(element => {
      return Recipe.find({title: element})
      .then((finalPlan) => {
        console.log(finalPlan)
        
      })
      .catch((err) => {
        console.log(err)
      })
    });
  }).catch((err) => {
    console.log(err)
    res.redirect('/create-planner')
  })
  
})

module.exports = router;
