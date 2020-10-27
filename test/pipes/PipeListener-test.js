const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../src/leanes/index.js").default;
const { Pipe, PipeListener, PipeMessage } = LeanES.NS.Pipes.NS;

describe('PipeListener', () => {
  describe('.new, .write', () => {
    it('should create new PipeListener instance', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const vmListener = function (aoMessage) {
          this.write(aoMessage);
        };
        const voMessage = PipeMessage.new(PipeMessage.NORMAL);
        const spyWrite = sinon.spy(voOutput, 'write');
        const pipeListener = PipeListener.new(voOutput, vmListener);
        pipeListener.write(voMessage);
        assert.isTrue(spyWrite.calledWith(voMessage), 'Message not passed into writer');
      }).to.not.throw(Error)
    })
  })
})
