const { Hotel } = require('../models/hotel')
const Room = require('../models/room')

// Read - Get All Room
exports.getRooms = (req, res, next) => {
    const idHotel = req.query.idHotel
    Room.findAll({ where: { HotelIdHotel: idHotel } }).then(rooms => {
        res.render('room/rooms', {
            pageTitle: 'All Rooms',
            path: '/room/rooms',
            rooms: rooms
        })
    }).catch(err => {
        console.log(err)
    })
}

// Create Room
exports.getAddRoom = (req, res, next) => {
    Hotel.findAll().then(hotels => {
        if (!hotels) {
            return res.redirect('/')
        }

        console.log(hotels)

        res.render('room/add-room', {
            pageTitle: 'Add Room',
            path: '/room/add-room',
            hotels: hotels
        })
    }).catch(err => {
        console.log(err)
    })

}

exports.postAddRoom = (req, res, next) => {
    const roomNumber = req.body.roomNumber
    const name = req.body.name
    const description = req.body.description
    const floor = req.body.floor
    const type = req.body.type
    const classRoom = req.body.classRoom
    const status = req.body.status
    const dailyCost = req.body.dailyCost
    const HotelIdHotel = req.body.HotelIdHotel

    Room.create({
        roomNumber: roomNumber,
        name: name,
        description: description,
        floor: floor,
        type: type,
        classRoom: classRoom,
        status: status,
        dailyCost: dailyCost,
        HotelIdHotel: HotelIdHotel
    }).then(result => {
        res.redirect(`/room/rooms/?idHotel=${HotelIdHotel}`)
    }).catch(err => {
        res.redirect('/room/rooms')
        console.log(err)
    })
}

// Read Room
exports.getRoom = (req, res, next) => {
    const idRoom = req.params.idroom
    Room.findOne({ where: { idRoom: idRoom } }).then(room => {
        if (!room) {
            return res.redirect('/room/rooms')
        }

        const roomNumber = room.roomNumber
        res.render('room/room', {
            pageTitle: `${roomNumber}`,
            path: '/room/room',
            room: room
        })
    }).catch(err => {
        console.log(err)
    })
}

// Update Room
exports.getEditRoom = (req, res, next) => {
    const idRoom = req.params.idroom
    Room.findByPk(idRoom).then(room => {
        if (!room) {
            return res.redirect('/room/rooms')
        }
        res.render('room/edit-room', {
            pageTitle: room.name,
            path: '/room/edit-room',
            room: room
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postEditRoom = (req, res, next) => {
    const roomNumber = req.body.roomNumber
    const name = req.body.name
    const description = req.body.description
    const floor = req.body.floor
    const type = req.body.type
    const classRoom = req.body.classRoom
    const status = req.body.status
    const dailyCost = req.body.dailyCost

    const idRoom = req.body.idRoom
    Room.findByPk(idRoom).then(room => {
        room.roomNumber = roomNumber
        room.description = description
        room.name = name
        room.floor = floor
        room.type = type
        room.classRoom = classRoom
        room.status = status
        room.dailyCost = dailyCost
        return room.save()
    }).then(result => {
        res.redirect(`/room/room/${idRoom}`)
    }).catch(err => console.log(err))
}

// Delete Host
exports.postDeleteRoom = (req, res, next) => {
    const idRoom = req.body.idRoom
    Room.destroy({ where: { idRoom } })
    res.redirect(`/hotel/hotels/`)
}
