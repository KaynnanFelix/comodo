const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

const Employee = sequelize.define('Employee', {
    idEmployee: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }, 
    job: {
        type: DataTypes.ENUM,
        values: ['manager', 'receptionist', 'maid', 'security', 'cleaning'],
        allowNull: false
    },
    salary : {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    workShift: {
        type: DataTypes.ENUM,
        values: ['morning', 'afternoon', 'night'],
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Employee', // We need to choose the model name
    freezeTableName: true,
    tableName: 'Employees'
})

Employee.hasMany(Employee, {as: 'supervisor'})

module.exports = Employee
