exports.check =  function(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

exports.login =  function(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return res.redirect('/');
  }
  return next();
}