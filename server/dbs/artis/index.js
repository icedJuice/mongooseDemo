// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// // artiSchema 文章信息
// var artiSchema = new Schema({
//     title: String,
//     arti: String,
//     tags: String,
//     author: String,
//     created_at: Timestamp, // 时间戳
//     created_at_iso: Date,
//     update_at: Timestamp, // 时间戳
//     update_at_iso: Date
// })

// // artis 文章表
// // 存放用文章相关的 title,arti, tags 等字段
// var artiConnect = mongoose.createConnection('mongodb://localhost:27017/artis');

// var artiModel = artiConnect.model('artiModel', artiSchema);

function _add () {

}

function _delete() {

}

function _update() {

}

function _find() {

}
var artis = {
    add: _add,
    delete: _delete,
    update: _update,
    find: _find
}

module.exports = artis;