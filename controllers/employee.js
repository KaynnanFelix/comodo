const Employee = require('../models/employee')

// Read - Get All Employee
exports.getEmployees = (req, res, next) => {
    Employee.findAll().then(employees => {
        res.render('employee/employees', {
            pageTitle: 'All Employees',
            path: '/employee/employees',
            employees: employees
        })
    }).catch(err => {
        console.log(err)
    })
}

// Create Employee
exports.getAddEmployee = (req, res, next) => {
    res.render('employee/add-employee', {
        pageTitle: 'Add Employee',
        path: '/employee/add-employee',
    })
}

exports.postAddEmployee = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const nationality = req.body.nationality
    const documentType = req.body.documentType
    const documentNumber = req.body.documentNumber
    const address = req.body.address
    const birthDate = req.body.birthDate
    const job = req.body.job
    const salary = req.body.salary
    const workShift = req.body.workShift

    Employee.create({
        name: name,
        email: email,
        birthDate: birthDate,
        nationality: nationality,
        documentType: documentType,
        documentNumber: documentNumber,
        address: address,
        phone: phone,
        job: job,
        salary: salary,
        workShift: workShift
    }).then(result => {
        res.redirect('/employee/employees')
    }).catch(err => {
        console.log(err)
    })
}

// Read Employee
exports.getEmployee = (req, res, next) => {
    const idEmployee = req.params.idemployee
    Employee.findOne({ where: { idEmployee: idEmployee } }).then(employee => {
        if (!employee) {
            return res.redirect('/employee/employees')
        }

        const name = employee.name

        res.render('employee/employee', {
            pageTitle: `${name}`,
            path: '/employee/employee',
            employee: employee
        })

    }).catch(err => {
        console.log(err)
    })
}

// Update Employee
exports.getEditEmployee = (req, res, next) => {
    const idEmployee = req.params.idemployee
    Employee.findByPk(idEmployee).then(employee => {
        if (!employee) {
            return res.redirect('/employee/employee')
        }
        res.render('employee/edit-employee', {
            pageTitle: employee.name,
            path: '/employee/edit-employee',
            employee: employee
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postEditEmployee = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const nationality = req.body.nationality
    const documentType = req.body.documentType
    const documentNumber = req.body.documentNumber
    const address = req.body.address
    const birthDate = req.body.birthDate
    const job = req.body.job
    const salary = req.body.salary
    const workShift = req.body.workShift

    const idEmployee = req.body.idemployee
    Employee.findByPk(idEmployee).then(employee => {
        employee.name = name
        employee.email = email
        employee.phone = phone
        employee.nationality = nationality
        employee.documentType = documentType
        employee.documentNumber = documentNumber
        employee.address = address
        employee.birthDate = birthDate
        employee.job = job
        employee.salary = salary
        employee.workShift = workShift

        return employee.save()
    }).then(result => {
        res.redirect(`/employee/employee/${idEmployee}`)
    }).catch(err => console.log(err))
}

// Delete Employee
exports.postDeleteEmployee = (req, res, next) => {
    const idEmployee = req.body.idEmployee
    Employee.destroy({ where: { idEmployee } })
    res.redirect('/employee/employees')
}
