var User = require('../modules/user.module');
var UserRead = User.read;

const Joi = require('joi');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.getUserData = async function(email,password){
    var data = await UserRead.query(function(query){
        query.select('*');
        query.where(function(){
            this.where('email','=', email)
        })
    })
    .fetch().then(function(data){  

        if(!bcrypt.compareSync(password, data.attributes.password)){
            return false
        }
        return data

    })
    .catch(function (error) {
        return false
    });

    return data
};


exports.getUserById = async function(id){
    var data = await UserRead.query(function(query){
        query.select('*');
        query.where(function(){
            this.where('id','=', id)
        })
    })
    .fetch().then(function(data){  
        return data
    })
    .catch(function (error) {
        return false
    });

    return data
};

exports.createUser = async function(email,password){
    var userData = {
        email:email,
        password:password,
    }
    const { PASSWORD_MAX, PASSWORD_MIN } = require('../../constants/login');
    var schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string()
            .min(PASSWORD_MIN)
            .max(PASSWORD_MAX).required(),
    });
    
    try {
        payloadValidation = await Joi.validate(userData, schema, { abortEarly: false });
    } catch (validateRegisterError) {
        payloadValidation = validateRegisterError.details[0].message;
        return payloadValidation
    }

    const hashPassword = await bcrypt.hashSync(userData.password, salt);
    saveData = {email:email,password:hashPassword}

    var result = {}
    var data = UserRead.forge().save(saveData).then(function(res) {
        var status = bcrypt.compareSync(password, res.attributes.password);
        if(!status){
            return false
        }
        return "Create user success with "+saveData.email
    })
    .catch(function(error) {
        result['status'] = false
        result['error'] = error.sqlMessage
        
        return result
    })

    return data
};

exports.changePassword = async function(email,password,newPassword){
    var userData = {
        email:email,
        password:password,
        newPassword:newPassword
    }
    const { PASSWORD_MAX, PASSWORD_MIN } = require('../../constants/login');
    var schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string()
            .min(PASSWORD_MIN)
            .max(PASSWORD_MAX).required(),
        newPassword: Joi.string()
            .min(PASSWORD_MIN)
            .max(PASSWORD_MAX).required(),
    });
    
    try {
        payloadValidation = await Joi.validate(userData, schema, { abortEarly: false });
    } catch (validateRegisterError) {
        payloadValidation = validateRegisterError.details[0].message;
        return payloadValidation
    }
    
    const hashNewPassword = await bcrypt.hashSync(newPassword, salt);
    var data = await UserRead.query(function(query){
        query.select('*');
        query.where(function(){
            this.where('email','=', email)
        })
    })
    .fetch().then(async function(data){  
        if(!bcrypt.compareSync(password, data.attributes.password)){
            return "Email or password do not match"
        }
        var saveData = {
            password:hashNewPassword
        }
        await data.save(saveData)

        return "Password is change with " + userData.newPassword
    })
    .catch(function (error) {
        return "Email or password do not match"
    });

    return data
};

