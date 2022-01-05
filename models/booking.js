const { DataTypes } = require('sequelize')

const sequelize = require('../util/database');
const Host = require('./host');
const Room = require('./room');

const Booking = sequelize.define('Booking', {
    idBooking: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: DataTypes.ENUM,
        values: ['all inclusive', 'pension'],
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Booking', // We need to choose the model name
    freezeTableName: true,
    tableName: 'Booking'
})

Host.hasMany(Booking);
Booking.belongsTo(Host);

module.exports = Booking
