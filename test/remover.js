const Transform = require('stream').Transform;

var remover = function(number) {
  var self = this
  self.count = 0
  self.number = number
  return new Transform({
    transform(chunk, encoding, callback) {
      chunk = chunk.filter(function(char) {
        self.count = self.count + 1
        return self.count > self.number
      })
      callback(null, chunk)
    }
  })
}

module.exports = remover