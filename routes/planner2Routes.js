const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model');
const Plan = require('../models/Plan.model');
const User = require('../models/User.model');
const verifyLoggedIn = require("../middlewares/requireAuth");


router.get('/planner2', (req, res, next) => {
    Plan.find({owner: req.session.currentUserId})
      .populate({path: 'recipes.recipe'})
      .then((plans)=>{
          res.render("planner2.hbs",{
          scripts: ['planner2Script.js'],
          style: ["planner2Style.css"],
          plans: plans,})
        })
      .catch((error)=>console.log(error));
  });


router.get("/planner2/:planId",(req,res,next)=>{
      Plan.findById(req.params.planId)
        .populate({path: 'recipes.recipe'})
        .then((foundPlan)=>{
          res.status(200).json(foundPlan);
        })
        .catch((error)=>{console.log(error)});
})

router.patch("/plan/update",(req,res,next)=>{
  let data=req.body.data;
   Plan.findByIdAndUpdate(data.planID,data.plan)
       .then(()=>{
       res.status(200);})
       .catch((error)=>{console.log(error)});
})

router.post("/plan/create",(req,res,next)=>{

  let data=req.body.data;
   Plan.create(data.plan)
       .then(()=>{res.status(200);})
       .catch((error)=>{console.log(error)});
})

  module.exports = router;