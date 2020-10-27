const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../src/leanes/index.js").default;
const { LineControlMessage } = LeanES.NS.Pipes.NS;

describe('LineControlMessage', () => {
   describe('.new', () => {
     it('should create new LineControlMessage instance', () => {
       expect(() => {
         const vsType = LineControlMessage.FIFO;
         const message = LineControlMessage.new(vsType);
         assert.equal(message._type, vsType, 'Type is incorrect');
       }).to.not.throw(Error);
     });
   });
 });
