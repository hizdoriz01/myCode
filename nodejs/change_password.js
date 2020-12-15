require('dotenv').config();
var userService = require('./app/services/user')
const args = process.argv;

changePassword()

async function changePassword(){
    var email = args[2]
    var password = args[3]
    var newPassword = args[4]
    var status = await userService.changePassword(email,password,newPassword)

    console.log(status);
    process.exit(1);
}