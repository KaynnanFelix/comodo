const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

const Room = sequelize.define('Room', {
    // Model attributes are defined here
    idRoom: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['single', 'double'],
        allowNull: true
    },
    classRoom: {
        type: DataTypes.ENUM,
        values: ['deluxe', 'standard'],
        allowNull: true
    }, status: {
        type: DataTypes.ENUM,
        values: ['available', 'not available'],
        allowNull: true
    },
    dailyCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Room', // We need to choose the model name
    freezeTableName: true,
    tableName: 'Rooms'
});

module.exports = Room
