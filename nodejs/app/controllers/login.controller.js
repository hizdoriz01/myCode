var User = require('../models/user.model')

exports.redirectToDashboard = async function(req, res) {
    const debug = require('debug')('express:login');
    const { FETCH_INFO_ERROR_MESSAGE } = require('../../constants/login');
    let userInfo;   
    const { user } = req;
    try {
        userInfo = await User.getUserById(user.id);
    } catch (getUserError) {
        const messages = {
            errors: {
                databaseError: FETCH_INFO_ERROR_MESSAGE,
            },
        };

        return res.status(500).render('pages/login', { messages });
    }
    req.session.userInfo = userInfo

    return res.redirect('/');
}

exports.index = async function(req, res) {
    res.render('pages/login');
}

exports.logout = function(req, res) {
    req.logout();
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_COOKIE_NAME);
      res.status(301).redirect('/login');
    });
}