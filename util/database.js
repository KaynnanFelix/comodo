const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
/*
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/dbname', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})*/
const sequelize = new Sequelize('postgres://gszetujpncqrds:4da79d731b30182fb43aed2dafa0d0e2092d3bf3e6628cd0f8f3373a83b93069@ec2-54-196-105-177.compute-1.amazonaws.com:5432/d1nhehibva645h', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})
//postgres://gszetujpncqrds:4da79d731b30182fb43aed2dafa0d0e2092d3bf3e6628cd0f8f3373a83b93069@ec2-54-196-105-177.compute-1.amazonaws.com:5432/d1nhehibva645h
// schema: 'test' 
// Example for postgres

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = sequelize
// module.exports = testConnection()
