const { Builder } = require('xml2js');

module.exports = function (Module) {
  const {
    TestRenderer,
    initialize, module: moduleD, nameBy, meta, method,
    Utils: { _, assign }
  } = Module.NS;



  @initialize
  @moduleD(Module)
  class XmlRenderer extends TestRenderer {
    @nameBy static __filename = 'XmlRenderer';
    @meta static object = {};
    @method async render(ctx, aoData, resource, aoOptions) {
      const vhData = assign({}, aoData != null ? aoData : {});
      const builder = new Builder();
      return await builder.buildObject(vhData);
    }
  }
};
