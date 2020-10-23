import type { NotificationInterface } from '../../patternes';

export default (Module) => {
  const {
    Pipes,
    initializeMixin, meta, method,
    Utils: { genRandomAlphaNumbers }
  } = Module.NS;
  const {
    FilterControlMessage,
    JunctionMediator,
    PipeAwareModule,
    LogFilterMessage,
    LogMessage
  } = Pipes.NS;
  const {
    SEND_TO_LOG, LEVELS, DEBUG, ERROR, FATAL, INFO, WARN, CHANGE
  } = LogMessage;
  const { SET_PARAMS } = FilterControlMessage;
  const { STDLOG } = PipeAwareModule;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method listNotificationInterests(...args): string[] {
        const interests = super.listNotificationInterests(...args);
        interests.push(SEND_TO_LOG);
        interests.push(LogFilterMessage.SET_LOG_LEVEL);
        return interests;
      }

      @method async handleNotification(note: NotificationInterface): Promise<void> {
        let level;
        switch (note.getName()) {
          case SEND_TO_LOG:
            switch (note.getType()) {
              case LEVELS[DEBUG]:
                level = DEBUG;
                break;
              case LEVELS[ERROR]:
                level = ERROR;
                break;
              case LEVELS[FATAL]:
                level = FATAL;
                break;
              case LEVELS[INFO]:
                level = INFO;
                break;
              case LEVELS[WARN]:
                level = WARN;
                break;
              default:
                level = DEBUG;
                break;
            }
            const logMessage = LogMessage.new(level, this._multitonKey, note.getBody());
            await this._junction.sendMessage(STDLOG, logMessage);
            break;
          case LogFilterMessage.SET_LOG_LEVEL:
            const logLevel = note.getBody();
            const setLogLevelMessage = LogFilterMessage.new(SET_PARAMS, logLevel);
            await this._junction.sendMessage(STDLOG, setLogLevelMessage);
            const changedLevelMessage = LogMessage.new(CHANGE, this._multitonKey, `Changed Log Level to: ${LogMessage.LEVELS[logLevel]}`);
            await this._junction.sendMessage(STDLOG, changedLevelMessage);
            break;
          default:
            await super.handleNotification(note);
        }
      }
    }
    return Mixin;
  });
}
