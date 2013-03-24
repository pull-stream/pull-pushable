var pull = require('pull-stream')

module.exports = pull.pipeableSource(function () {
  var buffer = [], cbs = [], waiting = [], ended

  function drain() {
    while(waiting.length && (buffer.length || ended)) {
      var data = buffer.shift()
      var cb   = cbs.shift()

      waiting.shift()(ended, data)
      cb && cb(ended)
    }
  }

  function read (end, cb) {
    ended = ended || end
    waiting.push(cb)
    drain()
  }

  read.push = function (data, cb) {
    buffer.push(data); cbs.push(cb)
    drain()
  }

  read.end = function (end, cb) {
    if('function' === typeof end)
      cb = end, end = true
    ended = ended || end || true; cbs.push(cb)
    drain()
  }

  return read
})

