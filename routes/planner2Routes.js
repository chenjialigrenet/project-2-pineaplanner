const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model');
const Plan = require('../models/Plan.model');
const User = require('../models/User.model');
const verifyLoggedIn = require("../middlewares/requireAuth");


router.get('/planner2', (req, res, next) => {
    //console.log(req.session.currentUserId);
    res.render("planner2.hbs",{
            scripts: ['planner2Script.js'],
            style: ["planner2Style.css"],
});
  });



  module.exports = router;