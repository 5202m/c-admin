"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./resources/config');
const chatSession = require('./routes/chatSession');
const index = require('./routes/index');

global.rootdir = __dirname;
let app = express();
app.use(bodyParser.json({
    limit : '50mb'
})); // 最大传输量
app.use(bodyParser.urlencoded({
    limit : "50mb",
    extended : true,
    parameterLimit : 50000
}));
chatSession.startSession(app);
index.init(app,express);
// catch 404 and forward to error handler （400请求错误处理）
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
  console.error("500错误", err);
    var newErr = new Error('Not Found');
    newErr.status = err.status || 500;
    res.status(newErr.status);
    var renderError = {
        errmsg: `系统错误，请联系客服！`,
        errcode: newErr.status
    };
    if(config.isDevTest){
        renderError.err = err;
    }
    res.render('error', renderError);
});

module.exports = app;
