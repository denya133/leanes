const { Feed } = require('feed');

module.exports = function (Module) {
  const {
    TestRenderer,
    initialize, partOf, nameBy, meta, method,
    Utils: { _, assign, uuid }
  } = Module.NS;



  @initialize
  @partOf(Module)
  class AtomRenderer extends TestRenderer {
    @nameBy static __filename = 'AtomRenderer';
    @meta static object = {};
    @method async render(ctx, aoData, resource, aoOptions) {
      const vhData = assign({}, aoData != null ? aoData : {});
      const feed = new Feed({
        id: vhData.id != null ? vhData.id : uuid.v4(),
        title: vhData.title != null ? vhData.title : '',
        author: vhData.author,
        updated: vhData.updated,
        link: vhData.link,
        feed: vhData.feed,
        hub: vhData.hub,
        description: vhData.description,
        image: vhData.image,
        copyright: vhData.copyright
      });
      if (_.isArray(vhData.categories)) {
        for (let i = 0; i < vhData.categories.length; i++) {
          category = vhData.categories[i];
          feed.addCategory(category);
        }
      }
      if (_.isArray(vhData.contributors)) {
        for (let i = 0; i < vhData.contributor.length; i++) {
          contributor = vhData.contributor[i];
          feed.addCategory(contributor);
        }
      }
      if (_.isArray(vhData.items)) {
        for (let i = 0; i < vhData.items.length; i++) {
          item = vhData.items[i];
          feed.addCategory(item);
        }
      }
      return await feed.atom1();
    }
  }
};
