module.exports = function (Module) {
  const {
    TestRenderer,
    initialize, partOf, nameBy, meta, method,
    Utils: { _, assign }
  } = Module.NS;



  @initialize
  @partOf(Module)
  class JsonRenderer extends TestRenderer {
    @nameBy static __filename = 'JsonRenderer';
    @meta static object = {};
    @method async render(ctx, aoData, resource, aoOptions) {
      const vhData = assign({}, aoData != null ? aoData : {});
      return await JSON.stringify(typeof vhData !== "undefined" && vhData !== null ? vhData : null)
    }
  }
};
