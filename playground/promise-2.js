const request = require("request");

var addressAsync = (address) => {
    const encodedAddress = encodeURIComponent(address);
    //decodeURIComponent(encodedArg);

    return new Promise((resolve, reject) => {
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json:true
        }, (error, response, body) => {
            if (error){
                reject('Unable to connect to Google servers.');
            } 
            else if (body.status === 'ZERO_RESULTS'){
                reject(`Unable to find address '${address}'.`);
            }
            else if (body.status === 'OK'){
                var result = body.results[0];
                const location = result.geometry.location;

                resolve({
                    address: result.formatted_address,
                    latitude: location.lat,
                    longitude: location.lng
                });
            }
        });
    });
};
addressAsync('89037650').then((result)=>{
    console.log(JSON.stringify(result, undefined, 2));
}, (errorMessage)=>{
    console.log(errorMessage);
});