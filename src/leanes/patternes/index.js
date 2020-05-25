import ES from '../es';
// import joi from 'joi';
// import moment from 'moment';
// import statuses from 'statuses';
const { initialize, meta, nameBy, constant, resolver, util } = ES.NS;


@initialize
@resolver(require, name => require(name))
class PatternES extends ES {
  @nameBy static  __filename = 'PatternES';
  @meta static object = {};

  @constant ROOT = __dirname;

  // @constant HANDLER_RESULT =  'HANDLER_RESULT';
  // @constant RECORD_CHANGED =  'RECORD_CHANGED';
  // @constant CONFIGURATION =  'ConfigurationProxy';
  // @constant STARTUP = 'STARTUP';
  // @constant MIGRATE = 'MIGRATE';
  // @constant ROLLBACK = 'ROLLBACK';
  // @constant STOPPED_MIGRATE = 'STOPPED_MIGRATE';
  // @constant STOPPED_ROLLBACK = 'STOPPED_ROLLBACK';
  // @constant STARTUP_COMPLETE = 'STARTUP_COMPLETE';
  // @constant LIGHTWEIGHT = Symbol.for('LIGHTWEIGHT');
  // @constant MIGRATIONS = 'MigrationsCollection';
  // @constant SESSIONS = 'SessionsCollection';
  // @constant USERS = 'UsersCollection';
  // @constant SPACES = 'SpacesCollection';
  // @constant ROLES = 'RolesCollection';
  // @constant UPLOADS = 'UploadsCollection';
  // @constant RESQUE = 'ResqueProxy';
  // @constant START_RESQUE = 'START_RESQUE';
  // @constant DELAYED_JOBS_QUEUE = 'delayed_jobs';
  // @constant DELAYED_JOBS_SCRIPT = 'DelayedJobScript';
  // @constant DEFAULT_QUEUE = 'default';
  // @constant JOB_RESULT =  'JOB_RESULT';
  // @constant SHELL =  'SHELL';
  @constant APPLICATION_MEDIATOR =  'ApplicationMediator';
  @constant APPLICATION_PROXY =  'ApplicationProxy';
  // @constant APPLICATION_ROUTER =  'ApplicationRouter';
  // @constant APPLICATION_RENDERER =  'ApplicationRenderer';
  // @constant APPLICATION_SWITCH =  'ApplicationSwitch';
  // @constant APPLICATION_GATEWAY =  'ApplicationGateway';
  // @constant RESOURCE_RENDERER =  'ResourceRenderer';
  // @constant RESQUE_EXECUTOR =  'ResqueExecutor';
  // @constant LOG_MSG = 'LOG_MSG';
  // @constant UP = Symbol.for('UP');
  // @constant DOWN = Symbol.for('DOWN');
  // @constant NON_OVERRIDDEN = Symbol.for('NON_OVERRIDDEN');
  // @constant SUPPORTED_TYPES = {
  //   json:         'json',
  //   binary:       'binary',
  //   boolean:      'boolean',
  //   date:         'date',
  //   datetime:     'datetime',
  //   number:       'number',
  //   decimal:      'decimal',
  //   float:        'float',
  //   integer:      'integer',
  //   primary_key:  'primary_key',
  //   string:       'string',
  //   text:         'text',
  //   time:         'time',
  //   timestamp:    'timestamp',
  //   array:        'array',
  //   hash:         'hash',
  // };
  // @constant REVERSE_MAP = {
  //   createCollection: 'dropCollection',
  //   dropCollection: 'dropCollection',
  //   createEdgeCollection: 'dropEdgeCollection',
  //   dropEdgeCollection: 'dropEdgeCollection',
  //   addField: 'removeField',
  //   removeField: 'removeField',
  //   addIndex: 'removeIndex',
  //   removeIndex: 'removeIndex',
  //   addTimestamps: 'removeTimestamps',
  //   removeTimestamps: 'addTimestamps',
  //   changeCollection: 'changeCollection',
  //   changeField: 'changeField',
  //   renameField: 'renameField',
  //   renameIndex: 'renameIndex',
  //   renameCollection: 'renameCollection'
  // };
  // @constant METHODS = [
  //   'get',
  //   'post',
  //   'put',
  //   'head',
  //   'delete',
  //   'options',
  //   'trace',
  //   'copy',
  //   'lock',
  //   'mkcol',
  //   'move',
  //   'purge',
  //   'propfind',
  //   'proppatch',
  //   'unlock',
  //   'report',
  //   'mkactivity',
  //   'checkout',
  //   'merge',
  //   'm-search',
  //   'notify',
  //   'subscribe',
  //   'unsubscribe',
  //   'patch',
  //   'search',
  //   'connect'
  // ];

  // @util joi = joi;
  // @util moment = moment;
  // @util statuses = statuses;
}

require('./observer/Notification').default(PatternES);
require('./observer/Notifier').default(PatternES);
require('./observer/Observer').default(PatternES);
require('./proxy/Proxy').default(PatternES);
require('./mediator/Mediator').default(PatternES);
require('./command/SimpleCommand').default(PatternES);
require('./command/MacroCommand').default(PatternES);
require('./facade/Facade').default(PatternES);

require('./core/View').default(PatternES);
require('./core/Model').default(PatternES);
require('./core/Controller').default(PatternES);

export * from '../es';
// export type { AttributeConfigT } from './types/AttributeConfigT';
// export type { AttributeOptionsT } from './types/AttributeOptionsT';
// export type { ComputedConfigT } from './types/ComputedConfigT';
// export type { ComputedOptionsT } from './types/ComputedOptionsT';
// export type { EmbedConfigT } from './types/EmbedConfigT';
// export type { EmbedOptionsT } from './types/EmbedOptionsT';
// export type { HttpRequestHashT } from './types/HttpRequestHashT';
// export type { HttpRequestParamsT } from './types/HttpRequestParamsT';
// export type { JoiT } from './types/JoiT';
// export type { MomentT } from './types/MomentT';
// export type { RelationConfigT } from './types/RelationConfigT';
// export type { RelationInverseT } from './types/RelationInverseT';
// export type { RelationOptionsT } from './types/RelationOptionsT';
// export type { RequestT } from './types/RequestT';
// export type { ResourceListResultT } from './types/ResourceListResultT';
// export type { ResourceRendererItemResultT } from './types/ResourceRendererItemResultT';
// export type { ResourceRendererListResultT } from './types/ResourceRendererListResultT';
// export type { RouteOptionsT } from './types/RouteOptionsT';
// export type { RouterRouteT } from './types/RouterRouteT';
// export type { StreamT } from './types/StreamT';

// export type { ApplicationInterface } from './interfaces/ApplicationInterface';
// export type { CollectionInterface } from './interfaces/CollectionInterface';
export type { CommandInterface } from './interfaces/CommandInterface';
export type { ControllerInterface } from './interfaces/ControllerInterface';
// export type { ConfigurationInterface } from './interfaces/ConfigurationInterface';
// export type { ContextInterface } from './interfaces/ContextInterface';
// export type { ControllerInterface } from './interfaces/ControllerInterface';
// export type { CursorInterface } from './interfaces/CursorInterface';
// export type { DelayableInterface } from './interfaces/DelayableInterface';
// export type { EmbeddableStaticInterface } from './interfaces/EmbeddableStaticInterface';
export type { FacadeInterface } from './interfaces/FacadeInterface';
// export type { IterableInterface } from './interfaces/IterableInterface';
export type { MediatorInterface } from './interfaces/MediatorInterface';
// export type { MigrationInterface } from './interfaces/MigrationInterface';
// export type { MigrationStaticInterface } from './interfaces/MigrationStaticInterface';
export type { ModelInterface } from './interfaces/ModelInterface';
export type { NotificationInterface } from './interfaces/NotificationInterface';
export type { NotifierInterface } from './interfaces/NotifierInterface';
// export type { ObjectizerInterface } from './interfaces/ObjectizerInterface';
export type { ObserverInterface } from './interfaces/ObserverInterface';
export type { ProxyInterface } from './interfaces/ProxyInterface';
// export type { QueryableCollectionInterface } from './interfaces/QueryableCollectionInterface';
// export type { QueryInterface } from './interfaces/QueryInterface';
// export type { QueueInterface } from './interfaces/QueueInterface';
// export type { RecordInterface } from './interfaces/RecordInterface';
// export type { RecordStaticInterface } from './interfaces/RecordStaticInterface';
// export type { RelatableStaticInterface } from './interfaces/RelatableStaticInterface';
// export type { RequestInterface } from './interfaces/RequestInterface';
// export type { ResourceInterface } from './interfaces/ResourceInterface';
// export type { ResourceRendererInterface } from './interfaces/ResourceRendererInterface';
// export type { ResponseInterface } from './interfaces/ResponseInterface';
// export type { ResqueInterface } from './interfaces/ResqueInterface';
// export type { RouterInterface } from './interfaces/RouterInterface';
// export type { SerializableInterface } from './interfaces/SerializableInterface';
// export type { SerializerInterface } from './interfaces/SerializerInterface';
// export type { SwitchInterface } from './interfaces/SwitchInterface';
// export type { TransformStaticInterface } from './interfaces/TransformStaticInterface';
export type { ViewInterface } from './interfaces/ViewInterface';

export default PatternES;
