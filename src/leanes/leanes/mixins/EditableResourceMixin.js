

export default (Module) => {
  const {
    initializeMixin, meta, method, chains,
    Utils: { _ }
  } = Module.NS;


  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    @chains(function () {
      this.beforeHook('protectEditable', {
        only: ['create', 'update', 'delete']
      });
      this.beforeHook('setCurrentUserOnCreate', {
        only: ['create']
      });
      this.beforeHook('setCurrentUserOnUpdate', {
        only: ['update']
      });
      this.beforeHook('setCurrentUserOnDelete', {
        only: ['delete']
      });
    })
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async setCurrentUserOnCreate(...args) {
        this.recordBody.creatorId = this.session.uid || null;
        this.recordBody.editorId = this.recordBody.creatorId;
        return args;
      }

      @method async setCurrentUserOnUpdate(...args) {
        this.recordBody.editorId = this.session.uid || null;
        return args;
      }

      @method async setCurrentUserOnDelete(...args) {
        this.recordBody.editorId = this.session.uid || null;
        this.recordBody.removerId = this.recordBody.editorId;
        return args;
      }

      @method async protectEditable(...args) {
        this.recordBody = _.omit(this.recordBody, [
          'creatorId', 'editorId', 'removerId'
        ]);
        return args;
      }
    }
    return Mixin;
  });
}
