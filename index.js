var each = require('each-async');
var through = require('through');

module.exports = function (streams, callback) {
  var emitter = through();
  
  each(streams, function (stream, idx, done) {
    var called = false;
    
    stream.once('error', done);
    stream.once('finish', end);
    stream.once('close', end);
    
    function end () {
      if (!called) {
        process.nextTick(function () {
          emitter.emit('stream-end', stream);
          done()
        });
      };
      called = true;
    }
  }, callback);
  
  return emitter;
};