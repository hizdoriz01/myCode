var dbConfig = require('./path/to/connection');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

exports.knexDb = knex;
exports.bookshelfDb = bookshelf;
