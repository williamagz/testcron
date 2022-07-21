const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const Market = require('./Market');

module.exports = s => {
    s.define('Coin', {        // sequelize.define(modelName, attributes, options)
        coin: {
            type: DataTypes.STRING,
            allowNull: false 
        },

        // market: {
        //     type: DataTypes.INTEGER,
        //     // references: {
        //     //     model: Market,
        //     //     key: 'id',
        //     // },
        //     allowNull: false,            
        // },

        lastPrice: {
            type: DataTypes.FLOAT,
            allowNull: true            
        },

        fiveminprice: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    });
}