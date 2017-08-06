const yeargs = require("yargs");
const geocode = require('./geocode/geocode');

const argv = yeargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
}).help().alias('help','h').argv;

//console.log(argv);

geocode.address(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});