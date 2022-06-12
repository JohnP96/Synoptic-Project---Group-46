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

// const assert = require('assert'); // not used (using chai assert)
const { expect } = require('chai'); // chai assert
const{ add } = require('../server');


describe('The add funciton', () => {
    it('Should add 2 numbers togeather', () => {
        const result = add (2,2);
        // assert.equal(result, 4); // built in mocha asserts (chai is more powerful and useable so will use that)
        expect(result).to.be.eq(4); // chai assert
    });

    it('Should be able to handle ONE(1) number(int)', () =>{
        const result = add(2);
        expect(result).to.be.eq(2);
    })

    it('Should be able to handle 0(undefined) numbers(ints)', () => {
        const result = add();
        expect(result).to.be.eq(0);
    });

    it('Should return 0 if either argument is not a number(int)', () => {
        const result = add(2, 'test');
        expect(result).to.be.eq(0);
    })
});