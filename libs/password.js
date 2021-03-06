const crypto = require('crypto');
const db = require('../models/db');

module.exports.setPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100, 112, 'sha512').toString('hex');
    return  {hash, salt};
}

module.exports.validPassword = (password) => {
    const user = db.get('user').value();
    const hash = crypto.pbkdf2Sync(password, user.salt, 100, 112, 'sha512').toString('hex');
    return hash === user.hash;
}
