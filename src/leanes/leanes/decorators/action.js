import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');


export default function action(target, key, descriptor) {
  const isClass = target[cpoMetaObject] != null;
  assert(!isClass, 'Decorator `action` may be used with instance methods only');
  const vmFunctor = descriptor.value || descriptor.initializer && descriptor.initializer();
  const vcClass = target.constructor;
  assert(vcClass.isExtensible, `Class '${target.name}' has been frozen previously. Method '${key}' can not be declared`);
  // const wrapper = function (...args) {
  //   return vmFunctor.apply(this, args);
  // };
  // Reflect.defineProperty(wrapper, 'class', {
  //   value: vcClass,
  //   enumerable: true
  // });
  // Reflect.defineProperty(vmFunctor, 'class', {
  //   value: vcClass,
  //   enumerable: true
  // });
  // Reflect.defineProperty(wrapper, 'name', {
  //   value: key,
  //   configurable: true
  // });
  Reflect.defineProperty(vmFunctor, 'name', {
    value: key,
    configurable: true
  });
  // Reflect.defineProperty(vmFunctor, 'wrapper', {
  //   value: wrapper,
  //   enumerable: true
  // });
  // Reflect.defineProperty(wrapper, 'body', {
  //   value: vmFunctor,
  //   enumerable: true
  // });

  vcClass.metaObject.addMetaData('instanceMethods', key, vmFunctor);
  vcClass.metaObject.addMetaData('actions', key, vmFunctor);

  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    writable: false,
    value: vmFunctor
  };
}
