const db = require('../models/db');
const psw = require('../libs/password');

module.exports.get = async(ctx, next) => {
    ctx.render('pages/login');
}

 module.exports.post = async(ctx, next) => {
    const {email, password} = ctx.request.body;
    const user = db.getState().user;
    if(email == user.login && psw.validPassword(password)){
        ctx.session.isAdmin = true;
        ctx.redirect('/admin');
    } else {
        ctx.redirect('/login?No valid password or login')
    }
 }