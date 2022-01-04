const express = require('express')
const employeeController = require('../controllers/employee')
const router = express.Router()

// get all employees
router.get('/employees', employeeController.getEmployees)

// add new employee
router.get('/add-employee', employeeController.getAddEmployee)
router.post('/add-employee', employeeController.postAddEmployee)

// get employee by uuid
router.get('/employee/:idemployee', employeeController.getEmployee)

// edit employee
router.get('/edit-employee/:idemployee', employeeController.getEditEmployee)
router.post('/edit-employee', employeeController.postEditEmployee)

// delete employee by uuid
router.post('/delete-employee', employeeController.postDeleteEmployee)

module.exports = router