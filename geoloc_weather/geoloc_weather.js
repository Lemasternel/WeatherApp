const request = require("request");

var address = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    //decodeURIComponent(encodedArg);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true
    }, (error, response, body) => {
        if (error){
            callback('Unable to connect to Google servers.');
        } 
        else if (body.status === 'ZERO_RESULTS'){
            callback(`Unable to find address '${address}'.`);
        }
        else if (body.status === 'OK'){
            var result = body.results[0];
            const location = result.geometry.location;

            callback(undefined, {
                address: result.formatted_address,
                latitude: location.lat,
                longitude: location.lng
            });
        }
    });
};

var weather = (address, callback) => {
    //https://api.darksky.net/forecast/apikey/latitude,longitude
    //acfe87ce9a7ea8ebf011206029f4b7d6

    request({
        url:`https://api.darksky.net/forecast/acfe87ce9a7ea8ebf011206029f4b7d6/${address.latitude},${address.longitude}`,
        json:true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io servers.')
        } if (response.statusCode !== 200 ) {
            callback(`Unable to find weather for '${address.address}'.`);
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.address = address;
module.exports.weather = weather;