const Booking = require('../models/booking')
const Host = require('../models/host')

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

        res.render('booking/booking', {
            pageTitle: `${idBooking}`,
            booking: booking,
            //path: '/booking/booking'
            
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