const assert = require('chai');
ES = require('../../src/leanes/es/index');
const {co, filter} = ES.prototype.Utils;

describe('Utils.filter', () => {
   describe('filter(array, generator)', () => {
    it('should filter list by async condition', () => {
      return co(function*() {
        const array = [ES.prototype.Promise.resolve(1), ES.prototype.Promise.resolve(5), ES.prototype.Promise.resolve(3), ES.prototype.Promise.resolve(7), ES.prototype.Promise.resolve(2)];
        const context = {
          condition: function*(value) {
            let ref;
            return (3 < (ref = (yield value)) && ref < 7);
          }
        };
        const result = (yield filter(array, function*(item, index) {
          return (yield this.condition(item));
        }, context));
        assert.lengthOf(result, 1);
        assert.equal((yield result[0]), 5);
      });
    });
     it('should filter list by sync condition', () => {
      return co(function*() {
        const array = [ES.prototype.Promise.resolve(1), ES.prototype.Promise.resolve(5), ES.prototype.Promise.resolve(3), ES.prototype.Promise.resolve(7), ES.prototype.Promise.resolve(2)];
        const context = {
          condition: function(value) {
            return (3 < value && value < 7);
          }
        };
        const result = (yield filter(array, function*(item, index) {
          return this.condition((yield item));
        }, context));
        assert.lengthOf(result, 1);
        assert.equal((yield result[0]), 5);
      });
    });
  });
});
