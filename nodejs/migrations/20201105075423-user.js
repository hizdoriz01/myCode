'use strict';

var dbm;
var type;
var seed;

var fs = require('fs')
var path = require('path')

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const filePath = path.join(__dirname, 'sqls','up', 'create_table_user_up.sql')
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) return reject(err)
        resolve(data);
      })
    })
    .then((data) => {
      return db.runSql(data)
    })
};

exports.down = function(db) {
    const filePath = path.join(__dirname, 'sqls','down', 'create_table_user_down.sql')
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) return reject(err)
        resolve(data);
      })
    })
    .then((data) => {
      return db.runSql(data)
    })
};

exports._meta = {
  "version": 1
};
