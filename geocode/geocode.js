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

module.exports.address = address;