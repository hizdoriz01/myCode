const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

var userModel = require('../models/user.model');

exports.changePassword = async function(email,password,newPasswprd){
    var status = await userModel.changePassword(email, password,newPasswprd)
    
    return status
};

exports.createUser = async function(email,password){
    var status = await userModel.createUser(email, password)
    
    return status
};