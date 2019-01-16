var md5 = require('md5-node');

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

function _sigiIn (data, cb) {
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
var users = {
    addUser: _addUser,
    delete: _delete,
    update: _update,
    signIn: _sigiIn
}

module.exports = users;