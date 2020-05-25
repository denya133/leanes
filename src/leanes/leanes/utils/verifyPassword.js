import crypto from 'crypto';


export default (Module) => {
  Module.defineUtil(__filename, (
    { method = 'sha256', salt, hash: storedHash } = {},
    password
  ) => {
    const generatedHash = crypto.createHash(method).update(salt + password).digest('hex');
    return storedHash === generatedHash;
  });
}
