const path = require('path')
const express = require('express')
const hostController = require('../controllers/host')
const router = express.Router()

// get all hosts
router.get('/hosts', hostController.getHosts)

// add new host
router.get('/add-host', hostController.getAddHost)
router.post('/add-host', hostController.postAddHost)

// get host by uuid
router.get('/host/:idhost', hostController.getHost)

// edit host
router.get('/edit-host/:idhost', hostController.getEditHost)
router.post('/edit-host', hostController.postEditHost)

// delete host by uuid
router.post('/delete-host', hostController.postDeleteHost)

module.exports = router
