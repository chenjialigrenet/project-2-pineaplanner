const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model');
const Plan = require('../models/Plan.model');
const User = require('../models/User.model');
const verifyLoggedIn = require("../middlewares/requireAuth");

function renderPlan(plan, req, res, next) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ].map((dayOfWeek) => {
    return {
      dayOfWeek,
      meals: ['Breakfast', 'Lunch', 'Dinner'].map((mealName) => {
        const plannedRecipe = plan.recipeFor(dayOfWeek, mealName);
        return {
          recipe: plannedRecipe?.recipe,
          mealName,
        };
      }),
    };
  });

  res.render('planner.hbs', {
    days,
    planId: plan.id,
    style: ['mealPlannerStyle.css'],
  });
}

router.get('/planner',verifyLoggedIn, (req, res, next) => {
  //console.log(req.session.currentUserId);
  Plan.findOne({
    owner: req.session.currentUserId,
  })
    .populate({ path: 'recipes.recipe' })
    .then((plan) => {
      if (!plan) {
        User.findById(req.session.currentUserId)
          .then((user) => {
            Plan.create({ owner: user.id, recipes: [] })
              .then((plan) => {
                renderPlan(plan, req, res, next);
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        renderPlan(plan, req, res, next);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/planner/:planId/add-recipe', (req, res, next) => {
  Plan.findById(req.params.planId).then((plan) => {
    Recipe.find()
      .then((recipes) => {
        res.render('addRecipe.hbs', {
          scripts: ['addRecipe.js'],
          plan,
          recipes,
          dayOfWeek: req.query.dayOfWeek,
          mealName: req.query.mealName,
        });
      })
      .catch((err) => {
        next(err);
      });
  });
});

router.post('/planner/:planId/add-recipe', (req, res, next) => {
  Plan.findById(req.params.planId)
    .then((plan) => {
      Recipe.findById(req.body.recipeId).then((recipe) => {
        const existingPlannedRecipe = plan.recipeFor(
          req.body.dayOfWeek,
          req.body.mealName
        );
        if (existingPlannedRecipe) {
          existingPlannedRecipe.recipe = recipe;
        } else {
          plan.recipes.push({
            recipe,
            dayOfWeek: req.body.dayOfWeek,
            mealName: req.body.mealName,
          });
        }

        plan
          .save()
          .then(() => {
            res.redirect('/planner');
          })
          .catch((err) => {
            next(err);
          });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/planner/:planId/remove-recipe', (req, res, next) => {
  Plan.findById(req.params.planId)
    .then((plan) => {
      const existingPlannedRecipe = plan.recipeFor(
        req.query.dayOfWeek,
        req.query.mealName
      );

      if (!existingPlannedRecipe) {
        res.redirect('/planner');
      } else {
        const index = plan.recipes.indexOf(existingPlannedRecipe);
        plan.recipes.splice(index, 1);
        plan
          .save()
          .then(() => {
            res.redirect('/planner');
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
