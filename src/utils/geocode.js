
const request = require('request')

const geocode = (address, callback) => {
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`
    const mapboxAccessToken = 'pk.eyJ1IjoibWljaGl0c29uIiwiYSI6ImNrNGdwcno4ZDA0aWMzbnB3Zng1bHJqaHUifQ.MD0HYCxbBKBSf84R9adXCA'
    const url = `${mapboxURL}?access_token=${mapboxAccessToken}`

    request({url, json: true }, (error, response ) => {
        if(error) {
            callback('unavailable to connect to location services', undefined)
        } else if (!response.body.features.length) {
            callback('location not found', undefined) 
        } else {
            const coordinates = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:  response.body.features[0].place_name
            }
            callback(undefined, coordinates)
        }
        }
    )

}

module.exports = geocode