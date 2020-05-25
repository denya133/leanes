

export default async function map(items, lambda, context) {
  const result = [];
  for (const index in items) {
    const item = items[index];
    await (async (item, index, items, context) =>
      result.push((await lambda.call(context, item, index, items)))
    )(item, index, items, context);
  }
  return result;
}
