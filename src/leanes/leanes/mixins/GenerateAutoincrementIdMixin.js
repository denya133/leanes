

export default (Module) => {
  const {
    Query,
    initializeMixin, meta, method
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async generateId(): Promise<number> {
        const voQuery = Query.new()
          .forIn({'@doc': this.collectionFullName()})
          .max('@doc.id');
        let maxId = await (await this.query(voQuery)).first();
        maxId = maxId || 0;
        return ++maxId;
      }
    }
    return Mixin;
  });
}
