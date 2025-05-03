const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbConnection');
const isParanoid = true;

const Notifications = sequelize.define('Notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_read'
    }
}, {
    tableName: 'notifications',
    freezeTableName: true,
    underscored: true,
    paranoid: isParanoid
});

module.exports = {
    Notifications
};
