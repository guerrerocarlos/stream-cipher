Stream Cipher
=== 

Cipher and decipher streams 'on the fly' while keeping each byte position.

Specially designed to encrypt *Range-aware* content.

API
===


#### `var sc = StreamCipher(initialization_vector, password, speed, encript)`

Create a new engine instance. Options can contain the following

- initialization_vector: 'string' //(required)
- password: 'string' // (required)
- speed: 'number' // Increases the speed by generating HMACs less frequently
- encript: Boolean // true: cipher, false: decipher

Cipher Stream Example:
---
```javascript
var StreamCipher = require('stream-cipher')
var initialization_vector = "private_init_vector_string"
var password = "123dontusethispassword"

var sc = new StreamCipher(initialization_vector, password, 20, true)
var origin = fs.createReadStream('./lipsum.txt');
var destination = fs.createWriteStream('./lipsum-encripted.txt');
origin.pipe(sc.digest).pipe(destination)
```

Decipher Stream Example:
---
```javascript
var StreamCipher = require('stream-cipher')
var initialization_vector = "private_init_vector_string"
var password = "123dontusethispassword"

var sc = new StreamCipher(initialization_vector, password, 20, false)
var origin = fs.createReadStream('./lipsum-encripted.txt');
var destination = fs.createWriteStream('./lipsum-decripted.txt');
origin.pipe(sc.digest).pipe(destination)
```

Decipher Stream without first 10 bytes:
---
```javascript
var StreamCipher = require('stream-cipher')
var initialization_vector = "private_init_vector_string"
var password = "123dontusethispassword"

var sc = new StreamCipher(initialization_vector, password, 20, false, 10)
var origin = fs.createReadStream('./lipsum-encripted-without-first-10-bytes.txt');
var destination = fs.createWriteStream('./lipsum-decripted-without-first-10-bytes.txt');
origin.pipe(sc.digest).pipe(destination)
```

For more information, check the see the /test folder.