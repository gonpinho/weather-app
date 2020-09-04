const request = require('postman-request');

const forecast = (latitude, longitude, cb) => {

    const url = 'http://api.weatherstack.com/current?access_key=4d255ec2f2fec622db0657dd2ebf6f22&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        
        if (error) {
            cb('Unable to connect to weather service', undefined);
            return;
        }

        if (body.error) {
            cb('Unable to find location', undefined);
            return;
        }

        const weatherForecast = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The wind speed is ' + body.current.wind_speed + ' km/h and humidity is at ' + body.current.humidity + '%.';
        cb(undefined, weatherForecast);

    })
}

module.exports = forecast