const express = require('express')
const bookingController = require('../controllers/booking')
const router = express.Router()

// get all bookings
router.get('/bookings', bookingController.getBookings)

// add new booking
router.get('/add-booking', bookingController.getAddBooking)
router.post('/add-booking', bookingController.postAddBooking)

// get booking by uuid
router.get('/booking/:idBooking', bookingController.getBooking)

// edit booking
router.get('/edit-booking/:idBooking', bookingController.getEditBooking)
router.post('/edit-booking', bookingController.postEditBooking)

// delete booking by uuid
router.post('/delete-booking', bookingController.postDeleteBooking)

// Create and Delete Room in Booking
router.post('/add-booking-room', bookingController.postAddBookingRoom)
router.post('/delete-booking-room', bookingController.postDeleteBookingRoom)

module.exports = router