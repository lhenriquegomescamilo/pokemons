const Routers = require("./Routers");

const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const cors = require('cors');


class Api {
    constructor() {
        this._express = express();
        this.middleware();
    }

    middleware() {
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(__dirname, 'public')));
        this.express.use((error, req, res, next) => this._handlerError(error, req, res, next));
        this._startRouter(this.express);
    }

    _handlerError(error, req, res, next) {
        if (!error) next();
        // set locals, only providing error in rm-development
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};
        // render the error page
        res.status(error.status || 500);
        res.render('error');
    }

    _startRouter(express) {
        return new Routers(express);
    }

    get express() {
        return this._express;
    }


}

module.exports = Api;