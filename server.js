require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const fs = require('fs');

const pug = new Pug({
    viewPath: './views',
    pretty: false,
    app: app
});
const config = require('./config');
const router = require('./routes');
const port = process.env.DB_HOST || 3000;
const errorHandler = require('./libs/error')

app.use(static('./public'));

app.use(errorHandler);

app.on('error', (err, ctx) => {
    ctx.render('error', {
        status: ctx.response.status,
        error: ctx.response.message,
        stack: JSON.stringify(ctx)
    })
})

app.use(session(config.session, app)).use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    if(!fs.existsSync(config.upload)){
        fs.mkdirSync(config.upload)
    }
    console.log("App listen in port", port);
})