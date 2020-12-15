var bookshelf = require('../../config/bookshelf');
var db = bookshelf.bookshelfDb;

var userRead = db.Model.extend({
    tableName : 'user',
    idAttribute:'id',
});

exports.read = db.model('userRead',userRead);
