const db = require('../models/db');

module.exports.get = async(ctx, next) => {
    const products = db.getState().products || [];
    const skills = db.getState().skills || [];
    ctx.render('pages/index', {products: products, skills: skills});
}

module.exports.post = async(ctx, next) => {
    let fields = ctx.request.body
    let valid = validation(fields);
    if (!valid.err) {
        db.get('messages')
            .push({ name: fields.name, email: fields.email, message: fields.message })
            .write();
        res.redirect('/?Сообщение успешно отправлено');
    } else {
        res.redirect('/?Сообщение не отправлено!');
    }
}

const validation = (fields) => {
    if (!fields.name) {
        return { status: 'Не указано имя!', err: true }
    }
    if (!fields.email) {
        return { status: 'Не указан email!', err: true }
    }
    return { status: 'Ok', err: false }
}