const Joi = require('joi');

exports.validate = async function(req, res, next) {
    const constants = require('../constants/login');
    const { PASSWORD_MAX, PASSWORD_MIN } = require('../constants/login');
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string()
            .min(PASSWORD_MIN)
            .max(PASSWORD_MAX).required(),
        language: Joi.string().required(),
    });
    let payloadValidation = {};
    try {
        payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
    } catch (validateRegisterError) {
        payloadValidation = validateRegisterError;
    }
    const { details } = payloadValidation;
    let errors;

    if (details) {
        errors = {};
        details.forEach(errorDetail => {
        const {
            path: [key],
            type,
        } = errorDetail;
        const errorType = type.split('.')[1];
        errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
        });
    }
    if (errors) {
        req.session.messages = { errors };
        return res.render('pages/login',{ errors: errors , email:req.body.email });
        
    }
    return next();
};

exports.login = function(req, res, next) {

    const debug = require('debug')('express:login');
    const passport = require('passport');

    const {
    USERNAME_PASSWORD_COMBINATION_ERROR,
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_LOGGED_IN,
    } = require('../constants/login');

    return passport.authenticate('locals', (error, user) => {
        if (error || !user) {
        req.session.messages = {
            errors: { invalidEmailOrPassword: USERNAME_PASSWORD_COMBINATION_ERROR },
        };
        return res.status(401).redirect(global.baseUrl+'/login');
        }
        
        return req.logIn(user, loginError => {
        if (loginError) {
            req.session.messages = {
                errors: { internalServerError: INTERNAL_SERVER_ERROR },
            };
            return res.render('pages/login',{ errors: errors , email:req.body.email });
        }
        req.session.messages = { loggedIn: SUCCESSFULLY_LOGGED_IN };
        return next();
        });
    })(req, res, next);
}



async function loadPage(req, res) {
    const debug = require('debug')('express:login');
    res.render('pages/login');
}
