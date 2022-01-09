const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')


const bodyParser = require('body-parser')

const sequelize = require('./util/database');

const app = express()
const port = 2801

app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    helpers: require('./public/helpers/handlebars.js')
}))

app.set('view engine', 'handlebars')
app.set('views', './views')



const hotelRoutes = require('./routes/hotel')
const hostRoutes = require('./routes/host')
const employeeRoutes = require('./routes/employee')
const roomRoutes = require('./routes/room')
const bookingRoutes = require('./routes/booking')

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    console.log('Server running')
    res.render('home', {pageTitle: 'Home'})
})

app.use('/hotel', hotelRoutes)
app.use('/host', hostRoutes)
app.use('/employee', employeeRoutes)
app.use('/room', roomRoutes)
app.use('/booking', bookingRoutes)

app.use((req, res, next) => {
    res.status(404).render('pageNotFound', {pageTitle: '404'})
})

sequelize.sync().then(result => {
    app.listen(process.env.PORT || port, (req, res) => {
        console.log(`Server running on localhost:${port}`)
    })
}).catch(err => {
    console.log(err)
})


