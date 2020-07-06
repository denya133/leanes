var ES, assert, co, expect, map, sinon;
const assert = require('chai');
ES = require('../../src/leanes/es/index');
const {co, map} = ES.prototype.Utils;

describe('Utils.map', () => {
  describe('map(array, generator)', () => {
    it('should map list', () => {
      return co(function*() {
        const array = [ES.prototype.Promise.resolve(1), ES.prototype.Promise.resolve(5), ES.prototype.Promise.resolve(3), ES.prototype.Promise.resolve(7), ES.prototype.Promise.resolve(2)];
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
