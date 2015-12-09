module.exports = function (onClose) {
  var buffer = [], ended, abort, cb

  function callback (err, val) {
    var _cb = cb
    if(err && onClose) {
      var c = onClose
      onClose = null
      c(err === true ? null : err)
    }
    cb = null
    _cb(err, val)

  }

  function drain() {
    if(!cb) return

    if(abort)                        callback(abort)
    else if(!buffer.length && ended) callback(ended)
    else if(buffer.length)           callback(null, buffer.shift())
  }

  function read (_abort, _cb) {
    if(_abort) {
      abort = _abort
      //if there is already a cb waiting, abort it.
      if(cb) callback(abort)
    }
    cb = _cb
    drain()
  }

  read.push = function (data) {
    if(ended) return
    buffer.push(data)
    drain()
  }

  read.end = function (end) {
    ended = ended || end || true;
    drain()
  }

  return read
}


