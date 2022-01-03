const modules = require('../models/hotel')
const Hotel = modules.Hotel
const HotelEmail = modules.HotelEmail

// Get All Hotels
exports.getHotels = (req, res, next) => {
    const type = req.query.type
    if (type != null) {
        Hotel.findAll({ where: { type: type } }).then(hotels => {
            res.render('hotel/hotels', {
                hotels: hotels,
                pageTitle: 'Type Hotels',
                path: '/hotel/hotels'
            })
        }).catch(err => {
            console.log(err)
        })
    } else {
        Hotel.findAll().then(hotels => {
            res.render('hotel/hotels', {
                hotels: hotels,
                pageTitle: 'All Hotels',
                path: '/hotel/hotels'
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

exports.getAddHotel = (req, res, next) => {
    res.render('hotel/add-hotel', {
        pageTitle: 'Add Hotel',
        path: '/hotel/add-hotel'
    })
}

exports.postAddHotel = (req, res, next) => {
    const name = req.body.name
    const stars = req.body.stars
    const type = req.body.type
    const description = req.body.description
    const shuttle = req.body.shuttle
    const parking = req.body.parking
    const pool = req.body.pool
    const pet = req.body.pet
    const address = req.body.address
    const number = req.body.number
    const complement = req.body.complement
    const district = req.body.district
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    Hotel.create({
        name: name,
        stars: stars,
        type: type,
        description: description,
        shuttle: shuttle,
        parking: parking,
        pool: pool,
        pet: pet,
        address: address,
        number: number,
        complement: complement,
        district: district,
        city: city,
        state: state,
        country: country
    }).then(result => {
        // console.log(result)
        res.redirect('/hotel/hotels')
        console.log(`Created ${name} Hotel's`)
    }).catch(err => {
        console.log(err)
    })
}

exports.getHotel = (req, res, next) => {
    const idHotel = req.params.idHotel
    Hotel.findOne({ where: { idHotel: idHotel } }).then(hotel => {
        if (!hotel) {
            return res.redirect('/hotel/hotels')
        }
        const name = hotel.name

        HotelEmail.findAll({ where: { HotelIdHotel: idHotel } }).then(emails => {

            res.render('hotel/hotel', {
                pageTitle: `${name}`,
                path: '/hotel/hotel',
                hotel: hotel,
                emails: emails
            })
            console.log(emails)
        }).catch(err => {
            console.log("merda" + err)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getEditHotel = (req, res, next) => {
    const idHotel = req.params.idHotel
    Hotel.findByPk(idHotel).then(hotel => {
        if (!hotel) {
            return res.redirect('/hotel/hotels')
        }
        res.render('hotel/edit-hotel', {
            pageTitle: hotel.name,
            path: '/hotel/edit-hotel',
            hotel: hotel
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postEditHotel = (req, res, next) => {

    const updatedName = req.body.name
    const updatedStars = req.body.stars
    const updatedType = req.body.type
    const updatedDescription = req.body.description
    const updatedShuttle = req.body.shuttle
    const updateParking = req.body.parking
    const updatedPool = req.body.pool
    const updatedPet = req.body.pet
    const updatedAddress = req.body.address
    const updatedNumber = req.body.number
    const updatedComplement = req.body.complement
    const updatedDistrict = req.body.district
    const updatedCity = req.body.city
    const updatedState = req.body.state
    const updatedCountry = req.body.country

    const idHotel = req.body.idHotel
    Hotel.findByPk(idHotel).then(hotel => {
        hotel.name = updatedName,
            hotel.stars = updatedStars,
            hotel.type = updatedType,
            hotel.description = updatedDescription,
            hotel.shuttle = updatedShuttle,
            hotel.parking = updateParking,
            hotel.pool = updatedPool,
            hotel.pet = updatedPet,
            hotel.address = updatedAddress,
            hotel.number = updatedNumber,
            hotel.complement = updatedComplement,
            hotel.district = updatedDistrict,
            hotel.city = updatedCity,
            hotel.state = updatedState,
            hotel.country = updatedCountry
        return hotel.save()
    }).then(result => {
        console.log('Updated hotel.')
        res.redirect(`/hotel/hotel/${idHotel}`)
    }).catch(err => console.log(err))
}

exports.postDeleteHotel = (req, res, next) => {
    const idHotel = req.body.idHotel
    Hotel.destroy({ where: { idHotel } })
    res.redirect('/hotel/hotels')
}