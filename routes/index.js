const Router = require('koa-router');
const router = new Router(); 
const koaBody = require('koa-body');
const controllers = require('../controllers');

const isAdmin = (ctx, next) => {
    if (ctx.session.isAdmin) {
        return next()
    } else {
        ctx.redirect('/login?Пожалуйста авторизуйтесь')
    }
}

router.get('/', controllers.index);
router.post('/', koaBody(), controllers.sendMessage);

router.get('/login', controllers.login);
router.post('/login', koaBody(), controllers.auth);

router.get('/admin', controllers.admin);
router.post('/admin/upload',koaBody({
    multipart: true,
    formidable: {
        uploadDir: process.cwd() + '/public/upload',
    }
}), controllers.uploadProduct);

router.post('/admin/skills',koaBody(), controllers.updateSkills);

module.exports = router;