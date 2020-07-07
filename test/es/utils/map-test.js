const assert = require('chai');
ES = require('../../../src/leanes/es/index');
const {co, map} = ES.NS.Utils;

describe('Utils.map', () => {
  describe('map(array, generator)', () => {
    it('should map list', () => {
      co(function*() {
        const array = [ES.NS.Promise.resolve(1), ES.NS.Promise.resolve(5), ES.NS.Promise.resolve(3), ES.NS.Promise.resolve(7), ES.NS.Promise.resolve(2)];
        const context = {
          name: 'context'
        };
        const result = (yield map(array, function*(item, index) {
          return `item_${(yield item)}_${this.name}`;
        }, context));
        assert.deepEqual(result, ['item_1_context', 'item_5_context', 'item_3_context', 'item_7_context', 'item_2_context']);
      });
    });
  });
});
