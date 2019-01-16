var express = require('express');
var routers = express.Router();
var formatData = require('../utils/formatData.js');

var db = require('../dbs/index');

var DB_Users = db.users;
var DB_Artis = db.artis;

// 登陆
routers.post('/signin', function (req, res) {
    // 登陆需要 username password
    // 登陆成功后， 返回username及token
    if (!req.body.username || !req.body.password) {
        return res.send(
            formatData(301)
        )
    }
    DB_Users.signIn(req.body, (errCode, doc) => {
        res.send(
            formatData(errCode, doc)
        )
    })
})

// 注册
routers.post('/login', function (req, res) {
    // 注册需要 username password
    // 注册成功后，返回username及token
    if (!req.body.username || !req.body.password) {
        return res.send(
            formatData(301)
        )
    }
    DB_Users.addUser(req.body, function (errCode, data) {
        res.send(
            formatData(errCode, data)
        )
    })
})


module.exports = routers;