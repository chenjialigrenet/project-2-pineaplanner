const express = require('express');
const Plan = require('../models/Plan.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home.hbs', {});
});

module.exports = router;
