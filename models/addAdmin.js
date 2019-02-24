const readline = require('readline');
const db = require('./db');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const psw = require('../libs/password');

let hash = '';
let salt = '';
let login = '';
let password = {};

rl.question('Login: ', answer => {
    login = answer;
    rl.question('Password: ', answer => {
        password = psw.setPassword(answer);
        hash = password.hash;
        salt = password.salt;   
        rl.close();
    })
})

rl.on('close', () => {
    db.set('user', {login, salt, hash}).write();
})