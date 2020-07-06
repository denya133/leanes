const chai = require("chai");
const sinon = require("sinon-chai");

const expect = chai.expect;

const MetaObject = require("../../lib/index.js");
describe('CoreObject', () => {
  describe('constructor', () => {
    it('should be created ', () => {
      expect(new MetaObject()).to.be.an.instanceof(MetaObject);
    })
  });
  describe('add metadata', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.addMetadata);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.addMetadata).to.not.throw();
    })
  });
  describe('merge metadata', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.mergeMetaData);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.mergeMetaData).to.not.throw();
    })
  });
  describe('append metadata', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.appendMetaData);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.appendMetaData).to.not.throw();
    })
  });
  describe('remove metadata', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.removeMetaData);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.removeMetaData).to.not.throw();
    })
  });
  describe('collect group', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.collectGroup);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.collectGroup).to.not.throw();
    })
  });
  describe('get group', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.getGroup);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.getGroup).to.not.throw();
    })
  });
  describe('get own group', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(MetaObject.getOwnGroup);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('', () => {
      expect(MetaObject.getOwnGroup).to.not.throw();
    })
  });
})
