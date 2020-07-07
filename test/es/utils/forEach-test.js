const assert = require('chai');
const ES = require('lib');
const{co, filter} = ES.NS.Utils;

describe('Utils.forEach', () => {
   describe('forEach(array, generator)', () => {
     it('should iterate over list', () => {
      co(function*() {
        const array = [ES.NS.Promise.resolve(1), ES.NS.Promise.resolve(5), ES.NS.Promise.resolve(3), ES.NS.Promise.resolve(7), ES.NS.Promise.resolve(2)];
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
