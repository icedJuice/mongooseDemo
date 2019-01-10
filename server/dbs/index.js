var users = require('./users/index.js');
var artis = require('./artis/index.js');
module.exports = {
    users: users,
    artis: artis
};

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var schema1 = new Schema({ name: String });
// var schema2 = new Schema({ num: Number});
// var conn1 = mongoose.createConnection("mongodb://localhost/A表");
// var conn2 = mongoose.createConnection("mongodb://localhost/B表");
// var model1 = conn1.model('model1',schema1);
// var model2 = conn2.model('model2',schema2);

// var assert = require('assert');
// var doc1=new model1({name:'doc1'});
// doc1.save(function(err){
//   assert.equal(null,err);
// });
// var doc2=new model2({num:2});
// doc2.save(function(err){
//   assert.equal(null,err);
// });