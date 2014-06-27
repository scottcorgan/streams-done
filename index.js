var each = require('each-async');
var through = require('through');

module.exports = function (streams, callback) {
  var emitter = through();
  
  each(streams, function (stream, idx, done) {
    var localStream = through();
    stream.pipe(localStream);
    stream.on('error', done);
    stream.on('end', function () {
      emitter.emit('stream-end', stream);
      done();
    });
  }, callback);
  
  return emitter;
};