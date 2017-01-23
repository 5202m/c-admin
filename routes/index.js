const adminRouter = require('./web/admin');
const path = require('path');

class Index {
    constructor(){}
    _setStaticPath() {
        this._app.use(this._express.static(path.join(__dirname, '../public')));
    }
    _setRouteEntrance() {
        this._app.use('/admin', adminRouter);
    }
    _setViews() {
        this._app.set('views', path.join(__dirname, '../views'));
        this._app.set( 'view engine', 'html' );
        this._app.engine('.html', require('ejs').__express);//两个下划线
    }
    init(app, express) {
        this._app = app;
        this._express = express;
        this._setRouteEntrance();
        this._setViews();
        this._setStaticPath();
    }
}

module.exports = new Index();
