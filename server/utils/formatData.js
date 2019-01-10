function formatData(code, msg, data) {
    return {
        status: {
            code: 0,
            message: 'ok'
        },
        data: {
            status: {
                code: code,
                msg: msg
            },
            data: data
        }
    }
}

module.exports = formatData;