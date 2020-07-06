const chai = require("chai");
const sinon = require("sinon-chai");
const expect = chai.expect;
const CoreObject = require("./lib/index.js.js");

describe('CoreObject', () => {
  describe('constructor', () => {
    it('should be created ', () => {
      expect(new CoreObject()).to.be.an.instanceof(CoreObject);
    })
  });

  describe('get Module name', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.moduleName);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(CoreObject.moduleName).to.not.throw();
    })
  });

  describe('call method class', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.class);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(CoreObject.class).to.not.throw();
    })
  });

  describe('call method wrap', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.wrap);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(CoreObject.wrap).to.not.throw();
    })
  })
});