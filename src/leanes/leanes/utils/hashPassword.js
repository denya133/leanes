import crypto from 'crypto';


export default (Module) => {
  Module.defineUtil(__filename, (password, opts = {}) => {
    const { hashMethod: method = 'sha256', saltLength = 16 } = opts;
    const salt = crypto.randomBytes(saltLength).toString('hex');
    const hash = crypto.createHash(method).update(salt + password).digest('hex');
    return { method, salt, hash };
  });
}
