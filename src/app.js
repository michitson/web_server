const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for express config
const publicDirectoryPath  = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew',
        createdBy: 'Andrew Michitson'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Some Helpful Text',
        createdBy: 'Andrew Michitson'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Michitson',
        createdBy: 'Andrew Michitson'

    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
        
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send( {
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'help topic not found',
        name: 'Andrew Michitson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found',
        createdBy: 'Andrew Michitson'
    })
})


app.listen(3000, () => {
    console.log('server is running on port 3000')
})
