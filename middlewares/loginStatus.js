const User = require('../models/User.model');

module.exports = function exposeLoginStatus(req, res, next) {
  if (!req.session.currentUserId) {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    res.locals.isAdmin = false;
    next();
  } else {
    User.findById(req.session.currentUserId).then((user) => {
      res.locals.currentUser = user;
      res.locals.isLoggedIn = true;
      res.locals.isAdmin = user === 'admin';
      next();
    });
  }
};
