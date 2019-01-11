var md5 = require('md5-node');
// function md5 (value) {
//     return value;
// }
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// userSchema 用户信息
var userSchema = new Schema({
    username: String,
    password: String,
    token: String
})

// users 用户表
// 存放用username/password/token 等字段
var userConnect = mongoose.createConnection('mongodb://localhost:27017/users');

var userModel = userConnect.model('userModel', userSchema);

function _add (data, cb) {

    console.log('_add');console.log(data);
    _checkUserName(data.username, function (errorCode) {
        
        // 服务器内部错误， 或者名字已被占用
        if (errorCode === 500 || errorCode === 305) return cb(errorCode); 
        
        // 用户名未被使用
        userModel.create(
            { username: data.username, password: md5(data.password), token: 'abcdef' },
            function (error, docs) {
                // 服务器内部错误
                if (error) return cb(500);
                // 存入成功
                return cb(200, {username: docs.username, token: docs.token});
            }
        )
    })
}

function _checkUserName(username, cb) {
    userModel.find({'username': username}, function (error,docs) {
        if (error) return cb(500);
        if (docs.length) {
            // 名字已被占用
            return cb(305)
        } else {
            // 名字未被占用
            cb(200)
        }
    });
}

function _find (data, cb) {
    // data = {username: ***, password: ***}
    userModel.find({username: data.username},function (error,docs) {
        // 服务器内部错误
        if (error) return cb(500);
        // 用户名密码匹配成功， 返回用户名和token
        if (docs.length && docs[0].password == md5(data.password)) {
            var token = md5(Date.now() + docs[0].username);
            userModel.update({username: data.username }, {token: token});
            return cb(200, {username: docs[0].username, token: token})
        }
        //  用户名不存在或密码错误
        else {
            return cb(302)
        }
    });
} 

function _update(_old, _new, cb) {
    userModel.update(_old, _new, function (error) {
        if (err) return cb(500);
        return cb(200);
    })
}
function _delete() {}
var users = {
    add: _add,
    delete: _delete,
    update: _update,
    find: _find
}

module.exports = users;