module.exports = function (Module) {
  const {
    TestRenderer,
    initialize, partOf, nameBy, meta, method,
    Utils: { _, assign }
  } = Module.NS;



  @initialize
  @partOf(Module)
  class HtmlRenderer extends TestRenderer {
    @nameBy static __filename = 'HtmlRenderer';
    @meta static object = {};
    @method async render(ctx, aoData, resource, aoOptions) {
      const vhData = assign({}, aoData != null ? aoData : {});
      return `<html> <head> <title>${vhData.title != null ? vhData.title : ''}</title> </head> <body> <h1>${(vhData.headline1 != null ? vhData.headline1 : vhData.title) != null ? vhData.title : ''}</h1> <p>${(vhData.paragraph != null ? vhData.paragraph : vhData.description != null ? vhData.description : '') }</p> </body> </html>`;
    }
  }
};
