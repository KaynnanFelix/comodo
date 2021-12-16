const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

const Hotel = sequelize.define('Hotel', {
    // Model attributes are defined here
    idHotel: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stars: {
        type: DataTypes.ENUM,
        values: ['one', 'two', 'three', 'four', 'five'],
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ['hotel', 'resort'],
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    shuttle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    parking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    pool: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    pet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    number: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    complement: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    district: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    state: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(25),
        allowNull: true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Hotel', // We need to choose the model name
    freezeTableName: true,
    tableName: 'Hotels'
});

const HotelEmail = sequelize.define('HotelEmail', {
    // idHotel: {
    //     type: DataTypes.UUID,
    //     primaryKey: true
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'HotelEmail', // We need to choose the model name
    freezeTableName: true,
    tableName: 'HotelEmails'
})

Hotel.hasMany(HotelEmail, {
    foreignKey: {
        type: DataTypes.UUID
    } 
})

//Hotel.hasMany(HotelEmail)
HotelEmail.belongsTo(Hotel)

async function sync() {
    await Hotel.sync({ force: true });
    console.log("The table for the Hotel model was just (re)created!");
}

//const teste = HotelEmail.create({ HotelIdHotel: '3fec22bb-3ef9-4e4f-882c-b714ee778b47', email: 'teste@teste.com' })
//const teste2 = HotelEmail.create({ HotelIdHotel: 'bfdaaa79-3d19-45ef-b840-829f14cae37c', email: 'teste2@teste.com' })
//console.log(teste instanceof HotelEmail)
//console.log(teste.email)
// sync()

// `sequelize.define` also returns the model
console.log(Hotel === sequelize.models.Hotel); // true

module.exports ={
    Hotel: Hotel,
    HotelEmail: HotelEmail
} 
// module.exports = Hotel
