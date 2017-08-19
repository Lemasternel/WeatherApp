var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a+b);
            }
            else {
                reject('Arguments must be numbers!');
            }
        }, 1500);
    });
}

asyncAdd(1,1).then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, 1);
}).then((result)=>{
    console.log('New result: ', result);
}).catch((error)=>{
    console.log(error);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve('Hey, it worked!');
//         //reject('Unable to fulfill promise.');
//     }, 2500);
// });

// somePromise.then((message) => {
//     //Called when primise is resolved.
//     console.log('Success: ', message);
// }, (erroMessage) => {
//     //Called when promise is rejected.
//     console.log('Error: ', erroMessage);
// });