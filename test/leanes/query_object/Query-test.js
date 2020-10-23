const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Query,
  initialize, partOf, nameBy, meta, method, property, mixin, attribute, constant
} = LeanES.NS;


describe('Query', () => {
  describe('.new', () => {
    it('should create new query', () => {
      expect(() => {
        const query = Query.new();
      }).to.not.throw(Error);
    });
  });
  describe('forIn', () => {
    it('should add forIn equivalent statement', () => {
      const query = Query.new().forIn({
        '@cucumber': 'cucumbers'
      }).forIn({
        '@tomato': 'tomatos'
      });
      expect(query).to.eql(Query.new({
        $forIn: {
          '@cucumber': 'cucumbers',
          '@tomato': 'tomatos'
        }
      }));
    });
  });
  describe('join', () => {
    it('should add join equivalent statement', () => {
      const query = Query.new().join({
        '@doc.tomatoId': {
          $eq: '@tomato._key'
        },
        '@tomato.active': {
          $eq: true
        }
      });
      expect(query).to.eql(Query.new({
        $join: {
          '@doc.tomatoId': {
            $eq: '@tomato._key'
          },
          '@tomato.active': {
            $eq: true
          }
        }
      }));
    });
  });
  describe('filter', () => {
    it('should add filter equivalent statement', () => {
      const query = Query.new().filter({
        '@doc.tomatoId': {
          $eq: '@tomato._key'
        },
        '@tomato.active': {
          $eq: true
        }
      });
      expect(query).to.eql(Query.new({
        $filter: {
          '@doc.tomatoId': {
            $eq: '@tomato._key'
          },
          '@tomato.active': {
            $eq: true
          }
        }
      }));
    });
  });
  describe('let', () => {
    it('should add let equivalent statement', () => {
      const query = Query.new().let({
        '@user_cucumbers': {
          $forIn: {
            '@cucumber': 'cucumbers'
          },
          $return: '@cucumber'
        }
      }).let({
        '@user_tomatos': {
          $forIn: {
            '@tomato': 'tomatos'
          },
          $return: '@tomato'
        }
      });
      expect(query).to.eql(Query.new({
        $let: {
          '@user_cucumbers': {
            $forIn: {
              '@cucumber': 'cucumbers'
            },
            $return: '@cucumber'
          },
          '@user_tomatos': {
            $forIn: {
              '@tomato': 'tomatos'
            },
            $return: '@tomato'
          }
        }
      }));
    });
  });
  describe('collect', () => {
    it('should add collect equivalent statement', () => {
      const query = Query.new().collect({
        '@country': '@doc.country',
        '@city': '@doc.city'
      });
      expect(query).to.eql(Query.new({
        $collect: {
          '@country': '@doc.country',
          '@city': '@doc.city'
        }
      }));
    });
  });
  describe('into', () => {
    it('should add into equivalent statement', () => {
      const query = Query.new().into({
        '@groups': {
          name: '@doc.name',
          isActive: '@doc.active'
        }
      });
      expect(query).to.eql(Query.new({
        $into: {
          '@groups': {
            name: '@doc.name',
            isActive: '@doc.active'
          }
        }
      }));
    });
  });
  describe('having', () => {
    it('should add having equivalent statement', () => {
      const query = Query.new().having({
        '@country': {
          $nin: ['Australia', 'Ukraine']
        }
      });
      expect(query).to.eql(Query.new({
        $having: {
          '@country': {
            $nin: ['Australia', 'Ukraine']
          }
        }
      }));
    });
  });
  describe('sort', () => {
    it('should add sort equivalent statement', () => {
      expect(() => {
        const query = Query.new();
        query.sort({
          '@doc.firstName': 'DESC'
        });
        assert.deepEqual(query.$sort, [
          {
            '@doc.firstName': 'DESC'
          }
        ]);
      }).to.not.throw(Error);
    });
  });
  describe('limit', () => {
    it('should add limit equivalent statement', () => {
      expect(Query.new().limit(10)).to.eql(Query.new({
        $limit: 10
      }));
    });
  });
  describe('offset', () => {
    it('should add offset equivalent statement', () => {
      expect(Query.new().offset(10)).to.eql(Query.new({
        $offset: 10
      }));
    });
  });
  describe('distinct', () => {
    it('should add distinict equivalent statement', () => {
      expect(Query.new().distinct()).to.eql(Query.new({
        $distinct: true
      }));
    });
  });
  describe('return', () => {
    it('should add return equivalent statement', () => {
      const query = Query.new().return({
        ageGroup: '@ageGroup',
        minAge: '@minAge',
        maxAge: '@maxAge'
      });
      expect(query).to.eql(Query.new({
        $return: {
          ageGroup: '@ageGroup',
          minAge: '@minAge',
          maxAge: '@maxAge'
        }
      }));
    });
  });
  describe('count', () => {
    it('should add count equivalent statement', () => {
      expect(Query.new().count()).to.eql(Query.new({
        $count: true
      }));
    });
  });
  describe('avg', () => {
    it('should add avg equivalent statement', () => {
      expect(Query.new().avg('@doc.price')).to.eql(Query.new({
        $avg: '@doc.price'
      }));
    });
  });
  describe('sum', () => {
    it('should add sum equivalent statement', () => {
      expect(Query.new().sum('@doc.price')).to.eql(Query.new({
        $sum: '@doc.price'
      }));
    });
  });
  describe('min', () => {
    it('should add min equivalent statement', () => {
      expect(Query.new().min('@doc.price')).to.eql(Query.new({
        $min: '@doc.price'
      }));
    });
  });
  describe('max', () => {
    it('should add max equivalent statement', () => {
      expect(Query.new().max('@doc.price')).to.eql(Query.new({
        $max: '@doc.price'
      }));
    });
  });
  describe('.replicateObject', () => {
    it('should create replica for query', async () => {
      const query = Query.new().forIn({
        '@doc': 'users'
      }).filter({
        '@doc.active': {
          $eq: true
        }
      }).collect({
        '@country': '@doc.country',
        '@city': '@doc.city'
      }).into({
        '@groups': {
          name: '@doc.name',
          isActive: '@doc.active'
        }
      }).having({
        '@country': {
          $nin: ['Australia', 'Ukraine']
        }
      }).return({
        country: '@country',
        city: '@city',
        usersInCity: '@groups'
      });
      const replica = await LeanES.NS.Query.replicateObject(query);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'Query',
        query: {
          '$forIn': {
            '@doc': 'users'
          },
          '$filter': {
            '@doc.active': {
              '$eq': true
            }
          },
          '$collect': {
            '@country': '@doc.country',
            '@city': '@doc.city'
          },
          '$into': {
            '@groups': {
              name: '@doc.name',
              isActive: '@doc.active'
            }
          },
          '$having': {
            '@country': {
              '$nin': ['Australia', 'Ukraine']
            }
          },
          '$return': {
            country: '@country',
            city: '@city',
            usersInCity: '@groups'
          }
        }
      });
    });
  });
  describe('.restoreObject', () => {
    it('should restore query from replica', async () => {
      const query = await LeanES.NS.Query.restoreObject(LeanES, {
        type: 'instance',
        class: 'Query',
        query: {
          '$forIn': {
            '@doc': 'users'
          },
          '$filter': {
            '@doc.active': {
              '$eq': true
            }
          },
          '$collect': {
            '@country': '@doc.country',
            '@city': '@doc.city'
          },
          '$into': {
            '@groups': {
              name: '@doc.name',
              isActive: '@doc.active'
            }
          },
          '$having': {
            '@country': {
              '$nin': ['Australia', 'Ukraine']
            }
          },
          '$return': {
            country: '@country',
            city: '@city',
            usersInCity: '@groups'
          }
        }
      });
      assert.deepEqual(query.toJSON(), {
        '$forIn': {
          '@doc': 'users'
        },
        '$filter': {
          '@doc.active': {
            '$eq': true
          }
        },
        '$collect': {
          '@country': '@doc.country',
          '@city': '@doc.city'
        },
        '$into': {
          '@groups': {
            name: '@doc.name',
            isActive: '@doc.active'
          }
        },
        '$having': {
          '@country': {
            '$nin': ['Australia', 'Ukraine']
          }
        },
        '$return': {
          country: '@country',
          city: '@city',
          usersInCity: '@groups'
        }
      });
    });
  });
});
