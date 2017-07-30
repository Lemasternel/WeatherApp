const request = require("request");
const yeargs = require("yargs");

const argv = yeargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
}).help().alias('help','h').argv;

//console.log(argv);

const encodedAddress = encodeURIComponent(argv.address);
//decodeURIComponent(encodedArg);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
}, (error, response, body) => {
    if (error){
        console.log('Unable to connect to Google servers.')
    } 
    else if (body.status === 'ZERO_RESULTS'){
        console.log(`Unable to find address '${argv.address}'.`);
    }
    else if (body.status === 'OK'){
        var result = body.results[0];
        console.log(`Address: ${result.formatted_address}`);
    
        const location = result.geometry.location;
        console.log(`Latitude: ${location.lat}`);
        console.log(`Longitude: ${location.lng}`);
    }
});