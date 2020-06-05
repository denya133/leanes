import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const slice = [].slice;


export default function nameBy(target, key, descriptor) {
  const filename = descriptor.value || descriptor.initializer && descriptor.initializer();
  // console.log('?>?>?> nameBy', target.name, key, filename);
  assert(filename != null, 'Value must be __filename');
  assert(target[cpoMetaObject] != null, 'Target for `nameBy` decorator must be a Class');
  // const [ classname ] = slice.call(filename.split('/'), -1)[0].split('.');
  // Reflect.defineProperty(target, 'name', {get: () => classname});
  return descriptor;
};
