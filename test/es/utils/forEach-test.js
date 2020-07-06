const assert = require('chai');
const ES = require.main.require('lib');
const{co, filter} = ES.prototype.Utils;

describe('Utils.forEach', () => {
   describe('forEach(array, generator)', () => {
     it('should iterate over list', () => {
      return co(function*() {
        const array = [ES.prototype.Promise.resolve(1), ES.prototype.Promise.resolve(5), ES.prototype.Promise.resolve(3), ES.prototype.Promise.resolve(7), ES.prototype.Promise.resolve(2)];
        const result = [];
        yield forEach(array, function*(item, index) {
          this.push({
            [`key_${index}`]: (yield item)
          });
        }, result);
        assert.deepEqual(result, [
          {
            key_0: 1
          },
          {
            key_1: 5
          },
          {
            key_2: 3
          },
          {
            key_3: 7
          },
          {
            key_4: 2
          }
        ]);
      });
    });
  });
});
