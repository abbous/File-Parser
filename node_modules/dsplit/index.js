var xString = require('x-is-string')
module.exports = dsplit
function dsplit (/*str*/path, /*str*/delimiter) {
  if (!xString(path)) return []
  if (!xString(delimiter)) delimiter = '/'
  // var len = path.length
  // var arr = path.split(delimiter)
  // return arr.length > len ? path.split('').map(function(){return''}) : arr
  return path.split(delimiter)
}
