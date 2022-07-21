const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = s => {
    s.define('Market', {        // sequelize.define(modelName, attributes, options)
        market: {
            type: DataTypes.STRING,
            allowNull: false 
        }              
    } , {freezeTableName: true},
    );
}