const db = require('../models/db');
const path = require('path');
const fs = require('fs');
const util = require('util');
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

module.exports.get = async(ctx, next) => {
    ctx.render('pages/admin');
}

module.exports.uploadProduct = async(ctx, next) => {
    const {name, price} = ctx.request.body;
    const {name: fileName, path: filePath} = ctx.request.files.photo;

    if(name != '' && price != ''){
        let newFileName = path.join(process.cwd(), 'public', 'upload', fileName);
        let pathFromSave = path.join('upload', fileName)

        await rename(filePath, newFileName);
        db.get('products').push({
            name: name,
            price: price,
            imgPath: pathFromSave
        }).write();
    } else {
        await unlink(filePath);
        ctx.redirect('/admin?Произошла ошибка');
    }
}  

module.exports.updateSkills = async(ctx, next) => {
    let fields = ctx.request.body;
    for (key in fields) {
        if (fields[key] != '') {
            db.get('skills')
                .find({ type: key })
                .assign({ number: fields[key] })
                .write()
        }
    }
    ctx.redirect('/admin?Success update skills');
}  