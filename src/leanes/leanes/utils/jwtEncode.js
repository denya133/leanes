import jwt from 'jsonwebtoken';


export default (Module) => {
  Module.defineUtil(__filename, async (
    asKey: string, asMessage: any, asAlgorithm: string
  ) => {
    return await jwt.sign(asMessage, asKey, {
      algorithm: asAlgorithm,
    });
  });
}
