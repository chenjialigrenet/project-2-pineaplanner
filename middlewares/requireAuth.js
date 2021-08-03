module.exports = function protectPrivateRoute(req, res, next) {
  if (req.session.currentUserId) next();
  else res.redirect('/signin');
};
