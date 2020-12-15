require('dotenv').config();
var userService = require('./app/services/user')
const args = process.argv;

createUser()

async function createUser(){
    var email = args[2]
    var password = args[3]
    var status = await userService.createUser(email,password)

    console.log(status);
    process.exit(1);
}