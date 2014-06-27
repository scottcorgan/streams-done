var fs = require('fs');
var test = require('tape');
var done = require('../');
var through = require('through');

test('executes callback when all streams are done', function (t) {
  t.plan(3);
  
  var streamsCalled = 0;
  var called1 = false;
  var called2 = false;
  var file1 = fs.createReadStream(__dirname + '/fixtures/file1.txt');
  var file2 = fs.createReadStream(__dirname + '/fixtures/file2.txt');
  
  var stream = done([file1.pipe(through(function (chunk) {
    called1 = true;
    this.queue(chunk);
  })), file2.pipe(through(function (chunk) {
    called2 = true;
    this.queue(chunk);
  }))], function (err) {
    t.ok(called1, 'stream 1 called');
    t.ok(called2, 'stream 2 called');
    t.equal(streamsCalled, 2, '2 streams called');
  });
  
  stream.on('stream-end', function () {
    streamsCalled += 1;
  });
});