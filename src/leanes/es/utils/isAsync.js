export default function isAsync(func) {  
  const GeneratorFunction = Object.getPrototypeOf(function*() {}).constructor;
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const isFunction = (f) => typeof f === 'function';
  return isFunction(func) && (
    func instanceof GeneratorFunction || func instanceof AsyncFunction
  );
}
