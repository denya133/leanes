const indexOf = [].indexOf;
const http = require('http');
const URL = require('url');
const AWAILIABLE_PATHS = ['/', '/test', '/redirect'];

exports.server = http.createServer(function(req, res) {
  const ref, ref1, ref2, response;
  res.setHeader('Content-Type', (ref = req.headers['accept']) != null ? ref : 'text/plain');
  const url = URL.parse(req.url);
  if (ref1 = url.pathname, indexOf.call(AWAILIABLE_PATHS, ref1) >= 0) {
    if (url.pathname === '/redirect') {
      res.statusCode = 302;
      res.statusMessage = 'Found';
      res.setHeader('Location', '/');
    } else {
      res.statusCode = req.method === 'DELETE' ? 202 : 200;
      res.statusMessage = req.method === 'DELETE' ? 'No Content' : 'OK';
    }
  } else {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
  }
  switch (req.method) {
    case 'GET':
    case 'POST':
    case 'PUT':
    case 'PATCH':
      if ((200 <= (ref2 = res.statusCode) && ref2 < 300)) {
        response = JSON.stringify({
          message: 'OK'
        });
      }
      break;
    case 'OPTIONS':
      res.setHeader('Allow', 'HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE');
  }
  res.end(response);
});

exports.listen = function(...args) {
  this.server.listen(...args);
};

exports.close = function(callback) {
  return this.server.close(callback);
};
