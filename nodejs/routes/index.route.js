const { wrap } = require('async-middleware');
const authMiddleware = require('../middlewares/auth');
const dashboardController = require('../app/controllers/dashboard.controller');
const locale = require('../middlewares/locale');

module.exports = function(router){
  router.get('/',  wrap(authMiddleware.check), dashboardController.list);

  router.get("/locale/:locale", wrap(locale.setLocale));
};
