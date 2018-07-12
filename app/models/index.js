const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const Config = require('../config/env/index')();
const basename = path.basename(module.filename);
const env = Config.env || 'development';
const db = {};

const sequelize = new Sequelize(Config.database, Config.username, Config.password, Config);

const findFile = (file) => {
    return (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js');
};

fs.readdirSync(__dirname)
    .filter(file => findFile(file))
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db)
    .forEach(modelName => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
