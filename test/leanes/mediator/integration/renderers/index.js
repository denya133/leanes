module.exports = function(Namespace) {
  const atomF = require('./atom');
  atomF(Namespace)
  const htmlF = require('./html');
  htmlF(Namespace);
  const jsonF = require('./json');
  jsonF(Namespace);
  const xmlF = require('./xml');
  xmlF(Namespace);
};
