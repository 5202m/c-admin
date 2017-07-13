let express = require('express');
const compression = require('compression');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let chatSession = require('./routes/chatSession');
let config = require('./resources/config');

let app = express();

global.rootdir = __dirname;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'template', 'favicon.ico')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(compression());

chatSession.startSession(app);
index.init(app, express);


// error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    res.status(err.status);
    var renderError = {
        errmsg: `请求错误: ${err.status}`,
        errcode: err.status,
        reqPath : req.path.replace(/\/(.*studio)(\/.*)?/g, "$1"),
        err: err
    };
    res.render('error', renderError);
});
app.use((err, req, res, next) => {
    var newErr = new Error('Not Found');
    newErr.status = err.status || 500;
    res.status(newErr.status);
    var renderError = {
        errmsg: `系统错误，请联系客服！`,
        errcode: newErr.status
    };
    if(config.isDevTest){
        console.error("500错误", err);
        renderError.err = err;
    }
    res.render('error', renderError);
});

module.exports = app;
