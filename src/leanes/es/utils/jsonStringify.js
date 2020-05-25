import stringify from 'json-stable-stringify';


export default function jsonStringify(aoObject, ahOptions) {
  return stringify(aoObject, ahOptions);
}
