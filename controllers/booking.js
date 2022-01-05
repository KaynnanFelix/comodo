const Booking = require('../models/booking')
const Host = require('../models/host')
const Room = require('../models/room')
const BookingRoom = require('../models/bookingRoom')

// Read - Get All Booking
exports.getBookings = (req, res, next) => {
    Booking.findAll().then(bookings => {
        res.render('booking/bookings', {
            pageTitle: 'All Booking',
            bookings: bookings,
            //path: '/booking/bookings'  
        })
    }).catch(err => {
        console.log(err)
    })
}

// Create Booking
exports.getAddBooking = (req, res, next) => {
    Host.findAll().then(hosts => {
        if (!hosts) {
            return res.redirect('/')
        }

        res.render('booking/add-booking', {
            pageTitle: 'Add Booking',
            hosts: hosts,
            //path: '/booking/add-booking'
        })
    }).catch(err => {
        console.log(err)
    })

}

exports.postAddBooking = (req, res, next) => {
    const category = req.body.category
    const HostIdHost = req.body.HostIdHost

    Booking.create({
        category: category,
        HostIdHost: HostIdHost
    }).then(result => {
        res.redirect('/booking/bookings')
    }).catch(err => {
        console.log(err)
    })
}

// Read Booking
exports.getBooking = (req, res, next) => {
    const idBooking = req.params.idBooking

    Booking.findOne({ where: { idBooking: idBooking } }).then(booking => {
        if (!booking) {
            return res.redirect('/booking/bookings')
        }
        const idBooking = booking.idBooking
        Room.findAll({ where: { status: 'available' } }).then(rooms => {
            BookingRoom.findAll({ where: { BookingId: idBooking } }).then(bookingRooms => {
                console.log(bookingRooms)
                res.render('booking/booking', {
                    pageTitle: `${idBooking}`,
                    booking: booking,
                    bookingRooms: bookingRooms,
                    rooms: rooms,
                    //path: '/booking/booking'    
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })


    }).catch(err => {
        console.log(err)
    })

}

// Update Booking
exports.getEditBooking = (req, res, next) => {
    const idBooking = req.params.idBooking
    Booking.findByPk(idBooking).then(booking => {
        if (!booking) {
            return res.redirect('/booking/booking')
        }
        res.render('booking/edit-booking', {
            pageTitle: booking.idBooking,
            booking: booking,
            //path: '/booking/edit-booking'
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postEditBooking = (req, res, next) => {
    const category = req.body.category
    const idBooking = req.body.idBooking
    Booking.findByPk(idBooking).then(booking => {
        booking.category = category
        return booking.save()
    }).then(result => {
        res.redirect(`/booking/booking/${idBooking}`)
    }).catch(err => console.log(err))
}

// Delete Booking
exports.postDeleteBooking = (req, res, next) => {
    const idBooking = req.body.idBooking
    Booking.destroy({ where: { idBooking } })
    res.redirect('/booking/bookings')
}

// Create BookingRoom
exports.postAddBookingRoom = (req, res, next) => {
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const idBooking = req.body.idBooking
    const idRoom = req.body.idRoom

    BookingRoom.create({
        BookingId: idBooking,
        RoomId: idRoom,
        startDate: startDate,
        endDate: endDate
    }).then(result => {
        res.redirect(`/booking/booking/${idBooking}`)
    }).catch(err => {
        console.log(err)
    })
}

// Delete BookingRoom
exports.postDeleteBookingRoom = (req, res, next) => {
    const BookingId = req.body.BookingId
    const RoomId = req.body.RoomId
    console.log('Deletando quarto da reserva')
    console.log(req.body.BookingId)
    console.log(req.body.RoomId)
    console.log('Deletando quarto da reserva')
    BookingRoom.destroy({ where: { BookingId: BookingId, RoomId: RoomId } })
    res.redirect(`/booking/booking/${BookingId}`)
}