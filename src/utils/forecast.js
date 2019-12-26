const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4b038f936a8ecf24db1eb3556d608174/${latitude},${longitude}`

    request({url, json: true }, (error, response ) => {
        if (error) {
            callback ("weather service unavailable" , undefined)
        } else if (response.body.error) {
            console.log("response body err", response.body)
            callback('unable to find location', undefined)
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast