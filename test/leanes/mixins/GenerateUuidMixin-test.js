const {expect, assert} = require('chai');
const LeanES = require('../../../src/leanes/leanes/index');
const {co} = LeanES.NS.Utils;

describe('GenerateUuidIdMixin', () => {
   describe('generateId', () => {
     it('should get generated ID', () => {
       co(function*() {
        const Test = (() => {
          class Test extends LeanES {};

          Test.inheritProtected();

          Test.initialize();

          return Test;

        }).call(this);
        const TestRecord = (() => {
          class TestRecord extends LeanES.prototype.Record {};

          TestRecord.inheritProtected();

          TestRecord.module(Test);

          TestRecord.initialize();

          return TestRecord;

        }).call(this);
        const TestCollection = (() => {
          class TestCollection extends LeanES.prototype.Collection {};

          TestCollection.inheritProtected();

          TestCollection.include(LeanES.prototype.GenerateUuidIdMixin);

          TestCollection.module(Test);

          TestCollection.initialize();

          return TestCollection;

        }).call(this);
        const collection = TestCollection.new('TEST_COLLECTION', {
          delegate: 'TestRecord'
        });
        const mask = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-[0-38-9a-fA-F][0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/;
        for (const i = j = 1; j <= 1000; i = ++j) {
          assert.match((yield collection.generateId()), mask);
        }
      });
    });
  });
});
