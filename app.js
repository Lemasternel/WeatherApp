const yeargs = require("yargs");
const geoloc_weather = require('./geoloc_weather/geoloc_weather');

const argv = yeargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
}).help().alias('help','h').argv;

//console.log(argv);

geoloc_weather.address(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));

        geoloc_weather.weather(results, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(results, undefined, 2));
            }
        });
    }
});

