import _ from 'lodash';
import assert from 'assert';

import type { ComputedOptionsT } from '../types/ComputedOptionsT';
import type { ComputedConfigT } from '../types/ComputedConfigT';

const cpoMetaObject = Symbol.for('~metaObject');

export default function computed(opts: ComputedOptionsT) {
  return (target, key, descriptor) => {
    const isClass = target[cpoMetaObject] != null;
    assert(!isClass, 'Decorator `computed` may be used with instance properties only');
    const vcClass = target.constructor;
    assert(vcClass.isExtensible, `Class '${target.name}' has been frozen previously. Property '${key}' can not be declared`);

    assert(vcClass.computeds[key] == null, `computed \`${key}\` has been defined previously`);
    assert(opts.type != null, 'option `type` is required');
    assert(descriptor.get != null, 'getter `lambda` in descriptor is required');
    assert(descriptor.set == null, 'setter `lambda` in descriptor is forbidden');

    opts.transform = opts.transform || (function () {
      switch (opts.type) {
        case 'primary_key':
          return () => vcClass.Module.NS.PrimaryKeyTransform;
        case 'string':
        case 'text':
          return () => vcClass.Module.NS.StringTransform;
        case 'date':
          return () => vcClass.Module.NS.DateTransform;
        case 'number':
        case 'decimal':
        case 'float':
        case 'integer':
          return () => vcClass.Module.NS.NumberTransform;
        case 'boolean':
          return () => vcClass.Module.NS.BooleanTransform;
        case 'array':
          return () => vcClass.Module.NS.ArrayTransform;
        case 'hash':
        case 'json':
          return () => vcClass.Module.NS.ObjectTransform;
        default:
          return () => vcClass.Module.NS.Transform;
      }
    })();

    opts.validate = opts.validate || function() {
      return opts.transform.call(this).schema.strip();
    };

    (opts: ComputedConfigT);

    vcClass.metaObject.addMetaData('computeds', key, opts);
    vcClass.metaObject.addMetaData('instanceVariables', key, descriptor);

    return descriptor;
  };
}
