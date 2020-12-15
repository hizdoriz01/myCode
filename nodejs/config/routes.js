var express = require('express');
var v1 = express.Router();
fs.readdirSync(appRoot+'/routes').forEach(function(file) {
    var name = file.substr(0, file.indexOf('.'));
    require('./path/to/routes/folder/' + name +'.route')(v1);
});

module.exports = {
    v1:v1
};