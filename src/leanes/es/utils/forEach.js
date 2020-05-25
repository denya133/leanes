

export default async function forEach(items, lambda, context) {
  for (const index in items) {
    const item = items[index];
    await (async (item, index, items, context) =>
      await lambda.call(context, item, index, items)
    )(item, index, items, context);
  }
  return;
}
