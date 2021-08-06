//Required modules
const express =           require('express');
const router =            express.Router();
const mongoose =          require('mongoose');

//Required models
const Recipe =            require('../models/Recipe.model');
const Plan =              require('../models/Plan.model');
const User =              require('../models/User.model');

//REquired middlewares
const verifyLoggedIn =    require('../middlewares/requireAuth');


//Routes that provides recipes to the planner based on different search and filtering criterias
router.get('/planner2', (req, res, next) => {
  Plan.find({ owner: req.session.currentUserId })
    .sort({title:1})
    .populate({ path: 'recipes.recipe' })
    .then((plans) => {
      res.render('planner2.hbs', {
        scripts: ['planner2Script.js'],
        style: ['planner2Style.css'],
        plans: plans,
      });
    })
    .catch((error) => console.log(error));
});

//Router provide the plans to the client owned by a user 
router.get('/planner2/refresh', (req, res, next) => {
  Plan.find({ owner: req.session.currentUserId })
    .sort({title:1})
    .then((plans) => { res.status(200).json(plans);})
    .catch((error) => console.log(error));

});

//Gives the recipes based on serach parameters
router.get('/planner2/getrecipes', (req, res, next) => {

  let searchTitle = req.params.search;
  let titleReg = new RegExp(`[A-Za-z]`);

  if (searchTitle !== '[A-Za-z]') {
    titleReg = new RegExp(searchTitle, 'gi');
  }
  let queryTitle = { title: titleReg };

  Recipe
    .find(queryTitle)
    .sort({ title: 1 })
    .then((foundRecipes)=>{
      let recipes=[];
      foundRecipes.forEach((foundRecipe)=>{
        let recipe = {title :foundRecipe.title, id:foundRecipe._id, image:foundRecipe.image};
        recipes.push(recipe);
      })
      res.status(200).json(recipes);
    })
    .catch((error)=>{res.status(500).json(err);});

});

//Gives a specific plan to the client
router.get('/planner2/:planId', (req, res, next) => {
  Plan.findById(req.params.planId)
    .populate({ path: 'recipes.recipe' })
    .then((foundPlan) => {
      res.status(200).json(foundPlan);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Router that handles the update of a plan
router.patch('/plan/update', (req, res, next) => {
  let data = req.body.data;
  Plan.findByIdAndUpdate(data.planID, data.plan)
    .then(() => {
      res.status(200);
      res.send("Success");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Router that handles the deletion of a plan
router.patch('/plan/delete', (req, res, next) => {
  let data = req.body.data;
  console.log(`data`, data);
  Plan.findByIdAndDelete(data.planID)
    .then(() => {
      res.status(200);
      res.send(`Succes`);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Router that handles the creation of a plan
router.post('/plan/create', (req, res, next) => {
  let data = req.body.data;
  let plan = data.plan;
  let session=req.session;
  plan.owner=session.currentUserId;

  
  Plan.create(plan)
    .then((newPlan) => {
      res.status(200);
      res.send(`${newPlan._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Add one recipe to a plan
router.post('/planner2/add-to-plan', (req, res, next) => {
  Plan.findById(req.body.planId)
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
            // res.redirect('/planner2');
            res.redirect('/recipes');
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

module.exports = router;
