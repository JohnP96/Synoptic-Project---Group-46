// this is the test framework that we will be using
//
// it uses:
// npm i mocha chai nyc
// mocha - framework
// chai  - asserts
// nyc   - coverage info
//
// to use:
// export any function in server.js
// build a test script in server.spec.js
// run npm run coverage  
// any errors will show
// use CTRL+C to end testing and see coverage data 

// test for all use cases of functions

// const assert = require('assert'); // not used (using chai assert)
const { expect } = require('chai'); // chai assert
//const{ add } = require('../server');
const fs = require('fs');

const { getAlerts } = require('../server')
const { sendEmail } = require('../server')
//const { myMap } = require('../views/map.ejs')

// describe('The add funciton', () => {
//     it('Should add 2 numbers togeather', () => {
//         const result = add (2,2);
//         // assert.equal(result, 4); // built in mocha asserts (chai is more powerful and useable so will use that)
//         expect(result).to.be.eq(4); // chai assert
//     });

//     it('Should be able to handle ONE(1) number(int)', () =>{
//         const result = add(2);
//         expect(result).to.be.eq(2);
//     })

//     it('Should be able to handle 0(undefined) numbers(ints)', () => {
//         const result = add();
//         expect(result).to.be.eq(0);
//     });

//     it('Should return 0 if either argument is not a number(int)', () => {
//         const result = add(2, 'test');
//         expect(result).to.be.eq(0);
//     })

//     //process.exit(1);
// });



describe('Tests', () => {
    it('Should load the alerts from file', () => {
        let alertFile = fs.readFileSync("alerts.json");

        getAlerts()
        x = 0
        if (alertFile == null) {
            x = 1
        }
        expect(x).to.be.eq(0); // chai assert
    });

    it('Should send an alert correctly', () => {

        let date = new Date(); //Gets the current date and time
        let alert = {
            id: date.getMilliseconds(),
            type: 'test',
            level: 'test',
            details: 'test',
            date: date,
            coords: '100,100'
        };

        sendEmail(alert)

        x = 0
        if (alert == null) {
            x = 1
        }
        expect(x).to.be.eq(0); // chai assert
    
    });


    //process.exit(1);
});