const Host = require('../models/host')

// Read - Get All Host
exports.getHosts = (req, res, next) => {
    Host.findAll().then(hosts => {
        res.render('host/hosts', {
            pageTitle: 'All Hosts',
            path: '/host/hosts',
            hosts: hosts
        })
    }).catch(err => {
        console.log(err)
    })
}

// Create Host
exports.getAddHost = (req, res, next) => {
    res.render('host/add-host', {
        pageTitle: 'Add Host',
        path: '/host/add-host',
    })
}

exports.postAddHost = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const type = req.body.type
    const nationality = req.body.nationality
    const documentType = req.body.documentType
    const documentNumber = req.body.documentNumber
    const address = req.body.address
    const birthDate = req.body.birthDate

    Host.create({
        name: name,
        email: email,
        birthDate: birthDate,
        nationality: nationality,
        documentType: documentType,
        documentNumber: documentNumber,
        address: address,
        phone: phone,
        type: type
    }).then(result => {
        res.redirect('/host/hosts')
    }).catch(err => {
        console.log(err)
    })
}

// Read Host
exports.getHost = (req, res, next) => {
    const idHost = req.params.idhost
    Host.findOne({ where: { idHost: idHost } }).then(host => {
        if (!host) {
            return res.redirect('/host/hosts')
        }

        const name = host.name

        res.render('host/host', {
            pageTitle: `${name}`,
            path: '/host/host',
            host: host
        })

    }).catch(err => {
        console.log(err)
    })
}

// Update Host
exports.getEditHost = (req, res, next) => {
    const idHost = req.params.idhost
    console.log(idHost)
    Host.findByPk(idHost).then(host => {
        if (!host) {
            return res.redirect('/host/host')
        }
        res.render('host/edit-host', {
            pageTitle: host.name,
            path: '/host/edit-host',
            host: host
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postEditHost = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const nationality = req.body.nationality
    const documentType = req.body.documentType
    const documentNumber = req.body.documentNumber
    const address = req.body.address
    const type = req.body.type
    const birthDate = req.body.birthDate

    const idHost = req.body.idhost
    Host.findByPk(idHost).then(host => {
        host.name = name
        host.email = email
        host.phone = phone
        host.nationality = nationality
        host.documentType = documentType
        host.documentNumber = documentNumber
        host.address = address
        host.type = type
        host.birthDate = birthDate

        return host.save()
    }).then(result => {
        res.redirect(`/host/host/${idHost}`)
    }).catch(err => console.log(err))
}

// Delete Host
exports.postDeleteHost = (req, res, next) => {
    const idHost = req.body.idHost
    Host.destroy({ where: { idHost } })
    res.redirect('/host/hosts')
}
