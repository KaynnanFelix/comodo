const { DataTypes } = require('sequelize')

const sequelize = require('../util/database');

const Booking = require("./booking");
const Room = require("./room");

const BookingRoom = sequelize.define('BookingRoom', {
    BookingId: {
        type: DataTypes.UUID,
        references: {
            model: Booking, // 'Bookings' would also work
            key: 'idBooking'
        }
    },
    RoomId: {
        type: DataTypes.UUID,
        references: {
            model: Room, // 'Rooms' would also work
            key: 'idRoom'
        }
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

Room.belongsToMany(Booking, { through:  BookingRoom, foreignKey: 'RoomId'});
Booking.belongsToMany(Room, { through: BookingRoom, foreignKey: 'BookingId' });

module.exports = BookingRoom
