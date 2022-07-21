const {Sequelize, DataTypes, Op} = require('sequelize');
const modelCoins = require('../backend/database/model/Coin');
const modelEmas = require('./database/model/Market');


const sequelize = new Sequelize('postgres://prueba2:123456@localhost:5432/crypto1', {logging: true});

modelCoins(sequelize);
modelEmas(sequelize);

sequelize.sync({force: false});

module.exports = {
    ...sequelize.models,
    db: sequelize
};

