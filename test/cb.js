var pull     = require('pull-stream')
var pushable = require('../')
var test     = require('tape')

test('pushable', function (t) {

  var buf = pushable()

  t.equal('function', typeof buf)
  t.equal(2, buf.length)

  buf.end(function (err) {
    console.error('end')
    t.notOk(err)
    t.end()
  })

  buf(null, function (end) {
    t.ok(end)

  })

})

