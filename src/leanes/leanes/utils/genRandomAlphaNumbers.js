import crypto from 'crypto';


export default (Module) => {
  Module.defineUtil(__filename, (length) =>
    crypto.randomBytes(length).toString('hex')
  );
}
