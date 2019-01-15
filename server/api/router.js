var express = require('express');
var routers = express.Router();
var formatData = require('../utils/formatData.js');

var db = require('../dbs/index');

console.log(db)
var DB_Users = db.users;
var DB_Artis = db.artis;

// 登陆
routers.post('/signin', function (req, res) {
    // 登陆需要 username password
    // 登陆成功后， 返回username及token

    if (!req.body.username || !req.body.password) {
        return res.send(
            formatData(301, '无效的用户名或密码', {})
        )
    }

    DB_Users.find(req.body, function (errCode, data) {
        // errCode 错误码
        // 如果有 data为 {username: **, token: **}
        switch (errCode) {
            case 200:
                // 有该用户 登陆成功
                res.send(
                    formatData(200, 'ok', data)
                );
                break;
            case 302:
                res.send(
                    formatData(302, '用户名或密码错误', {})
                );
                break;
            case 500:
                res.send(
                    formatData(500, '服务器内部错误', {})
                );
                break;
            default: 
                res.send(
                    formatData(errCode, '未知错误', {})
                );
                break;
        }
    })
})

// 注册
routers.post('/login', function (req, res) {
    // 注册需要 username password
    // 注册成功后，返回username及token
    if (!req.body.username || !req.body.password) {
        return res.send(
            formatData(301, '无效的用户名或密码', {})
        )
    }
    DB_Users.add(req.body).then((errCode, data)  => {
        res.send(
            formatData(errCode, data)
        )
    }).catch(errCode => {
        res.send(
            formatData(errCode)
        )
    })
    // DB_Users.add(req.body, function (errCode, data) {

    //     switch (errCode) {
    //         case 200: 
    //             res.send(
    //                 formatData(errCode, 'ok', data)
    //             );
    //             break;
    //         case 305:
    //             res.send(
    //                 formatData(errCode, '用户名已被占用', {})
    //             );
    //             break;
    //         case 500:
    //             res.send(
    //                 formatData(errCode, '服务器内部错误', {})
    //             );
    //             break;
    //     }
    // })
})



module.exports = routers;