import jwt from 'jsonwebtoken';


export default (Module) => {
  Module.defineUtil(__filename, async (
    asKey: string, asToken: string, abNoVerify: boolean = false
  ) => {
    return await (abNoVerify ? jwt.decode(asToken) : jwt.verify(asToken, asKey));
  });
}
