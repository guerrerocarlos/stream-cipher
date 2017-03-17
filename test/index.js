var StreamCipher = require('../')
var fs = require('fs')
var async = require('async')
var remover = require('./remover')

var remove_bytes = new remover(10)
var initialization_vector = "private_init_vector_string"
var wrong_initialization_vector = "prYvate_init_vector_string"
var password = "123dontusethispassword"
var wrong_password = "122dontusethispassword"

async.series([
  function(callback) {
    var t = new StreamCipher(initialization_vector, password, 20, true)
    var er = fs.createReadStream('./lipsum.txt');
    var d = fs.createWriteStream('./lipsum-encripted.txt');
    er.pipe(t.digest).pipe(d)
    d.on('finish', function() { callback() });
  },
  function(callback) {
    var t = new StreamCipher(wrong_initialization_vector, password, 20, false)
    var er = fs.createReadStream('lipsum-encripted.txt');
    var d = fs.createWriteStream('lipsum-not-decripted-by-wrong-iv.txt');
    er.pipe(t.digest).pipe(d)
    d.on('finish', function() { callback() });
  },
  function(callback) {
    var t = new StreamCipher(initialization_vector, password, 20, false)
    var er = fs.createReadStream('lipsum-encripted.txt');
    var d = fs.createWriteStream('lipsum-decripted.txt');
    er.pipe(t.digest).pipe(d)
    d.on('finish', function() { callback() });
  },
  function(callback) {
    var er = fs.createReadStream('lipsum-encripted.txt');
    var d = fs.createWriteStream('lipsum-encripted-without-10-first-bytes.txt');
    er.pipe(remove_bytes).pipe(d)
    d.on('finish', function() { callback() });
  },
  function(callback) {
    var t = new StreamCipher(initialization_vector, password, 20, false, 10)
    var er = fs.createReadStream('lipsum-encripted-without-10-first-bytes.txt');
    var d = fs.createWriteStream('lipsum-decripted-without-10-first-bytes.txt');
    er.pipe(t.digest).pipe(d)
    d.on('finish', function() { callback() });
  },
  function(callback) {
    var t = new StreamCipher(initialization_vector, wrong_password, 20, false)
    var er = fs.createReadStream('lipsum-encripted.txt');
    var d = fs.createWriteStream('lipsum-not-decripted-by-wrongpassword.txt');
    er.pipe(t.digest).pipe(d)
    d.on('finish', function() { callback() });
  },
  function() {
    console.log('All tests finished, check files generated in this folder.')
  }
]);