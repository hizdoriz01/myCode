const { wrap } = require('async-middleware');
const authMiddleware = require('../middlewares/auth');
const locale = require('../middlewares/locale');
const loginMiddleware = require('../middlewares/login');
const loginController = require('../app/controllers/login.controller');

module.exports = function(router, middlewares = []){
    router.post('/login', wrap(locale.loginLocale), wrap(loginMiddleware.validate), wrap(loginMiddleware.login), wrap(loginController.redirectToDashboard));
    router.get('/login', wrap(authMiddleware.login), wrap(loginController.index));
    router.get('/logout', middlewares.map(middleware => wrap(middleware)), wrap(loginController.logout));
}
