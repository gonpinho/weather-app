const request = require('postman-request')

const geocode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29ucGluaG8iLCJhIjoiY2tlZWpoaXZwMGd6cjJxbjc0bTB3cXpkZSJ9.O9wAYmflZs0F1G1S7G44Cg&limit=1'

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to location service', undefined);
            return;
        }
        if (body.features.length === 0) {
            cb('Unable to find location. Try another search.', undefined);
            return;
        }

        cb(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })

    })
}

module.exports = geocode