const yeargs = require('yargs');
const axios = require('axios');

const argv = yeargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
}).help().alias('help','h').argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/acfe87ce9a7ea8ebf011206029f4b7d6/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}, but fells like ${apparentTemperature}.`);

}).catch((error)=>{
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to conect to API servers.');
    } else {
        console.log(error.message);
    }
});
