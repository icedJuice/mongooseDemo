var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// artiSchema
var artiSchema = new Schema({
    id: String,
    title: String,
    arti: String,
    tags: String,
    author: String,
    created_at: {
        type:Date,
        default: Date.now
    },
    created_at_iso: {
        type: Date,
        default: () => new Date()
    },
    update_at: {
        type:Date,
        default: Date.now
    }, // 时间戳
    update_at_iso: {
        type: Date,
        default: () => new Date()
    }
});

// 新增
artiSchema.methods.addArti = function () {
    return new Promise((resolve, reject) => {
        this.save((error, doc) => {
            if (error) return reject(500);
            return resolve({
                id: this.id
            })
        })
    })
}

// 更新
artiSchema.methods.updateArti = function () {
    return new Promise((resolve, reject) => {
        this.update((error, doc) => {
            if (error) return reject(500);
            return resolve({
                id: this._id
            })
        })
    })
}


// artis 文章表
// 存放用文章相关的 title,arti, tags 等字段

var artiConnect = mongoose.createConnection('mongodb://localhost:27017/artis');

var artiModel = artiConnect.model('artiModel', artiSchema);

module.exports = artiModel;