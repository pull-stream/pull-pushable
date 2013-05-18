# pull-pushable

A pull-stream with a pushable interface.

## Example

``` js
var pushable = require('pull-pushable')
var pull     = require('pull-stream')

pushable.push(1)

pushable.pipe(pull.drain(console.log))
```

## License

MIT
