const express = require('express')
const roomController = require('../controllers/room')
const router = express.Router()

router.get('/rooms', roomController.getRooms)

router.get('/add-room', roomController.getAddRoom)
router.post('/add-room', roomController.postAddRoom)

router.get('/room/:idroom', roomController.getRoom)

router.get('/edit-room/:idroom', roomController.getEditRoom)
router.post('/edit-room', roomController.postEditRoom)

router.post('/delete-room', roomController.postDeleteRoom)

module.exports = router