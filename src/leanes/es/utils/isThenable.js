export default function isThenable(suspected) {
  return typeof (suspected != null ? suspected.then : undefined) === 'function';
}
