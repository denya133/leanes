

export default async function filter(items, lambda, context) {
  const result = [];
  for (const index in items) {
    const item = items[index];
    await (async (item, index, items, context) => {
      if (await lambda.call(context, item, index, items)) {
        result.push(item);
      }
    })(item, index, items, context);
  }
  return result;
}
