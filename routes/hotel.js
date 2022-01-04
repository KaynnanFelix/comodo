const path = require('path')
const express = require('express')
const hotelController = require('../controllers/hotel')
const router = express.Router()
// get all hotels
router.get('/hotels', hotelController.getHotels)

// add new hotel
router.get('/add-hotel', hotelController.getAddHotel)
router.post('/add-hotel', hotelController.postAddHotel)

// get hotel by uuid
router.get('/hotel/:idHotel', hotelController.getHotel)

// edit hotel
router.get('/edit-hotel/:idHotel', hotelController.getEditHotel)
router.post('/edit-hotel', hotelController.postEditHotel)

// delete hotel by uuid
router.post('/delete-hotel', hotelController.postDeleteHotel)

module.exports = router