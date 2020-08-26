/**
 *  le-map-e
 * Author: michael
 * Date: 19.09.15.
 * License: MIT
 */

'use strict';
const assert = require('assert');
const should = require('chai').should();
require('./../index');
describe('SetFunc', function () {

    describe('#last()', () => {
        it('should get the last item from the set', done => {
            let a = new Map([[1, 2]]);
            let b = new Set([new Map([[2,3]]),'43']);
            let c = b.last();
            c.should.be.a('Set');
            Array.from(c.keys())[0].should.equal('43');
            done();
        });
    });

    describe('#pop()', () => {
        it('should get the last item from the set and remove it', done => {
            let a = new Map([[1, 2]]);
            let b = new Set([new Map([[2,3]]),'43']);
            let c = b.pop();
            c.should.be.a('Set');
            Array.from(c.keys())[0].should.equal('43');
            Array.from(b.keys()).should.deep.equal([new Map([[2,3]])]);
            done();
        });
    });

    describe('#deepMapAppendOrNew()', () => {
        it('should add element to the set', done => {
            let a = new Set();
            a.deepMapAppendOrNew(3,4).deepMapAppendOrNew(5,7).deepMapAppendOrNew(5,9);
            a.should.deep.equal(new Set ([ new Map([['a','b'],[3,4], [5,7]],new Map([[5,9]]))]));
            done();
        });
    });
});