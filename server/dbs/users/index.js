var md5 = require('md5-node');
var creatHash = require('../../utils/createHash');
var userModel = require('./model')

function _addUser (data, cb) {
    
    var uModel = new userModel({
        username: data.username,
        password: md5(data.password),
        token: md5(data.username + Date.now())
    })
    
    uModel.addUser().then((doc) => {
        cb(200, {
            username: doc.username,
            token: doc.token
        })
    }).catch((errCode) => {
        cb(errCode)
    })
}

// 添加信息
// 用户名 随机，密码 123456
// var i = 0;
// var total = 20000;
// var t;
// for (; i < total; i ++) {
    // _addUser({
    //     username: '寒玉知',
    //     password: md5('123456')
    // }, function (err) {
    //     // ..
    // })
// }

// t = setInterval(function () {
//     if (i == total) {
//         clearInterval(t)
//     }
//     console.log(i)
// }, 50)


function _sigiIn (data, cb) {
    // console.log(md5('123456'))
    var uModel = new userModel({
        username: data.username,
        password: md5(data.password)
    })
    uModel.signIn().then(doc => {
        cb(200, doc)
    }).catch(errCode => {
        cb(errCode)
    })
} 

function _update(_old, _new, cb) {
    userModel.update(_old, _new, function (error) {
        if (err) return cb(500);
        return cb(200);
    })
}
function _delete() {}

function _checkoutToken(token, cb) {
    userModel.find({token: token}, function (error, docs) {
        if (error) return cb(500);
        if (docs.length) return cb();
        return cb(404);
    })
}

var users = {
    userModel: userModel,
    addUser: _addUser,
    delete: _delete,
    update: _update,
    signIn: _sigiIn,
    checkoutToken: _checkoutToken
}

module.exports = users;