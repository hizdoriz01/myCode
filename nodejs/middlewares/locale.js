exports.loginLocale =  function(req, res, next) {
  i18n.setLocale("EN")
  return next();
}

exports.setLocale =  function(req, res, next) {
  req.session.locale = req.params.locale;
  res.redirect('back');
}
