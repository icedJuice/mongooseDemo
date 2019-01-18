// js生成随机hash序列， 默认长度24

function createHash (hashLength) {

    var hashLength = hashLength || 24;
    var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var hs = [];
    var hl = Number(hashLength);
    var al = ar.length;
    for (var i = 0; i < hl; i ++) {
        hs.push(ar[Math.floor(Math.random() * al)]);
    }
    return hs.join('');
}

module.exports = createHash;