
const _ = require 'lodash';
const LeanES = require("../../../src/leanes/index.js").default;
{map} = LeanES.NS.Utils;
​
module.exports = (async function (resource, action, aoData) {
  return {
    [`${this.listEntityName}`]: await map(aoData, function(i) {
      return _.omi;
    })
  };
});