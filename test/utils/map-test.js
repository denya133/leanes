var RC, assert, co, expect, map, sinon;
const assert = require('chai');
const RC = require.main.require('lib');
const {co, map} = RC.prototype.Utils;

describe('Utils.map', () => {
  describe('map(array, generator)', () => {
    it('should map list', () => {
      return co(function*() {
        const array = [RC.prototype.Promise.resolve(1), RC.prototype.Promise.resolve(5), RC.prototype.Promise.resolve(3), RC.prototype.Promise.resolve(7), RC.prototype.Promise.resolve(2)];
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
