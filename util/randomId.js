const nanoid = require("nanoid/generate");
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generate(length = 10) {
    return nanoid(alphabet, length);
}

exports.generate = generate;