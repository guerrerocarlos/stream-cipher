const Transform = require('stream').Transform;
const crypto = require('crypto');
var fs = require('fs');

function StreamCipher(iv, password, speed, mode, i) {
  var self = this;
  self.speed = 20
  self.shatype = (256 * self.speed) >= 512 ? 'sha' + 512 : 'sha' + (256 * self.speed)
  self.fingersize = self.speed >= 2 ? 64 : 32
  self.fingers_count = 0
  self.iv = iv
  self.password = password

  if (i == undefined) {
    self.i = 0
  } else {
    self.i = i
  }
  return {
    digest: new Transform({
      transform(chunk, encoding, callback) {
        chunk = chunk.map(function(char) {
          if (self.i % (32 * self.speed) == 0 || self.finger == undefined) {
            self.fingers_count = self.fingers_count + 1
            hmac = crypto.createHmac(self.shatype, self.iv);
            hmac.update(self.iv + self.password + parseInt(self.i / (32 * self.speed)));
            self.finger = hmac.digest('buf')
          }
          self.i = self.i + 1
          return mode ? char + self.finger[(self.i - 1) % self.fingersize] : char - self.finger[(self.i - 1) % self.fingersize]
        })
        callback(null, chunk)
      }
    })
  }
}

module.exports = StreamCipher