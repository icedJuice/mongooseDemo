// module.exports = {
//     //全局
//     'sever error.': 500,

//     // 注册登录相关
//     'ok': 200,
//     'invalid username or password.': 301,
//     'error incorrect username or password.': 302,
//     'user name already exists.': 305

// }
module.exports = {
    //全局
    500: 'sever error.',
    404: 'not found.',
    400: 'token error.',
    200: 'ok',

    // 注册登录相关
    301: 'invalid username or password.',
    302: 'error incorrect username or password.',
    305: 'user name already exists.',

    // 文章相关
    311: 'invalid data: id.',
    312: 'incorrect parameters'
}