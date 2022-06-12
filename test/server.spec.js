// this is the test framework that we will be using
//
// it uses:
// npm i mocha chai nyc
//
// to use:
// export any function in server.js
// build a test script in server.spec.js
// run npm run test 
// any errors will show

const assert = require('assert');
const{add} = require('../server');

describe('The add funciton', () => {
    it('Should add 2 numbers togeather', () => {
        const result = add (2,2);
        assert.equal(result, 4);
    });
});