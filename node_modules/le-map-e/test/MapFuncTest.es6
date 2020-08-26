/**
 * xml2model
 * Author: michael
 * Date: 19.09.15.
 * License: MIT
 */
'use strict';
const assert = require('assert');
const should = require('chai').should();
const maps = require('./../index');

describe('MapFunc', function () {

    describe('#setOrCombine()', () => {
        it('should combine the arrays elements to', done => {
            let a = new Map([[1,[2]]]);
            a.setOrCombine(1, [3,4,5]);
            a.should.be.a('Map');
            a.get(1).should.be.a('Array');
            a.get(1).should.have.lengthOf(4, 'a is a array with a length of 4');
            done();
        });
    });

    describe('#setOrPush()', () => {
        it('should combine the arrays elements to', done => {
            let a = new Map([[1,[2]]]);
            a.setOrPush(1, [3,4,5]);
            a.should.be.a('Map');
            a.get(1).should.be.a('Array');
            a.get(1).should.have.lengthOf(2);
            a.get(1)[0].should.equal(2);
            a.get(1)[1].should.be.a('Array');
            a.get(1)[1].should.have.lengthOf(3);
            done();
        });
    });


    describe('#last()', () => {
        it('should return a Map holding the last element of the current one, the current should remain unchanged', done => {
            let a = new Map([[1,2],['a',4],['v',6]]);
            let b = a.last(false);
            b.should.be.a('Map');
            Array.from(b.entries()).should.deep.equal([['v',6]]);
            done();
        });
    });

    describe('#pop()', () => {
        it('should return a Map holding the last element of the current one, the current should have the last deleted', done => {
            let a = new Map([[1,2],['a',4],['v',6]]);
            let b = a.last(true);
            b.should.be.a('Map');
            Array.from(b.entries()).should.deep.equal([['v',6]]);
            Array.from(a.entries()).should.deep.equal(Array.from(new Map([[1,2],['a',4]]).entries()));
            done();
        });
    });

    describe('#tt()', () => {
        it('should return a Map holding the last element of the current one, the current should have the last deleted', done => {
            let a = new Map([[1,2],['a',4],['v',6]]);
            let c = new Map([[1,2],['a',4],['v',6]]);
            let b = new Set([a]);
            b.add(c);
            done();
        });
    });

    describe('#sort()', () => {
        it('should return a ASC sorted map', done => {
            let a = new Map([[1,2],['x',4],['v',6]]).sort();
            console.log(a);
            done();
        });
    });


});