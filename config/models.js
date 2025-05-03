const {sequelize} = require("./dbConnection");
const { DataTypes } = require('sequelize');
const { Notifications } = require("../models/models");
const isParanoid = true;

const Session = sequelize.define('Sessions', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    last_active: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'sessions',
    freezeTableName: true,
    underscored: true,
    paranoid: isParanoid,
});

Session.hasMany(Notifications, {
    foreignKey: 'session_id',
    as: 'notifications'
});

Notifications.belongsTo(Session, {
    foreignKey: 'session_id',
    as: 'sessions'
});

module.exports = {
    Session
}
