var mongoose = require('mongoose');
var md5 = require('md5-node');
var Schema = mongoose.Schema;

// userSchema 用户信息
var userSchema = new Schema({
    username: String,
    password: String,
    token: String
})

userSchema.statics.findByName = function(name, cb) {
    return new Promise((resolve, reject) => {
        this.find({ name: name}, function (error, docs) {
            if (error) {
                return reject(500);
            } else {
                return resolve(200, docs);
            }
        })
    });
};

userSchema.methods.addUser = function() {
    return new Promise((resolve, reject) => {
        this.model('userModel').find({ name: this.name }, function (error, docs) {
            if (error) {
                return reject(500);
            } else if (docs.length) {
                return reject(305)
            }
            this.save((error, docs) => {
                if (error) {
                    reject(500)
                } else {
                    resolve(200, docs)
                }
            });
        });
    })
};

userSchema.methods.signIn = function (data) {
    return new Promise((resolve, reject) => {
        this.model('userModel').find({name: data.name}, function (error, docs) {
            if (error) {
                return reject(500)
            }
            if (docs.length && docs[0].password === md5(data.password)) {
                resolve(200, {username: data.username, token: docs[0].token})
            } else {
                reject(301)
            }
        })
    })
}


// users 用户表
// 存放用username/password/token 等字段
var userConnect = mongoose.createConnection('mongodb://localhost:27017/users');

var userModel = userConnect.model('userModel', userSchema);

module.exports = userModel;