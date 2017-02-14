var exports = module.exports = {};
var http = require('http');
var router = require('./router.js');

var server = (SECURE, PORT, HOST, OPTIONS) => {
  _backlog = OPTIONS != null && OPTIONS != undefined ? OPTIONS.backlog : null;
  // Is server https?
  if (SECURE === false) {
    // Create server
    let srv = http.createServer(router.handler)

    // Start the server
    srv = srv.listen(PORT, HOST, _backlog, _listenCallback(SECURE, HOST, PORT));
  } else {
    console.log("Secure servers have not been implemented yet.");
  }
}

var _listenCallback = (SECURE, HOST, PORT) => {
  var SECURE = (SECURE === true) ? 'https' : 'http';
  var secureString = (SECURE === 'https') ? 'Secure server' : 'Server';
  var altHost = (HOST == 'localhost') ? '127.0.0.1' : HOST;
  altHost = (HOST == '127.0.0.1') ? 'localhost' : altHost;
  if (altHost == HOST) {
    console.log("%s listening on: %s://%s:%s", secureString, SECURE, HOST, PORT);
    return;
  }
  console.log("%s listening on: %s://%s:%s\n(%s)", secureString, SECURE, HOST, PORT, altHost);
}

exports.server = server;

// Routing
exports.get = router.get;
exports.post = router.post;
