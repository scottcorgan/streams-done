# streams-done

Get a callback when all streams have ended

## Install

```
npm install streams-done --save
```

## Usage

```js
var done = require('streams-done');
var fs = require('fs');

var file1 = fs.createReadStream('some/file1.txt');
var file2 = fs.createReadStream('some/file2.txt');

file1.pipe(someTransform);
file2.pipe(someTransform);

done([file1, file2], function (err) {
  // All done!
});
```

## Run Tests

```
npm install
npm test
```