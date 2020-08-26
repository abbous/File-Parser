# dsplit
split string into array with default delimiter `'/'`

# usage
`npm install dsplit`

```js
  var dsplit = require('dsplit')
  console.log(dsplit('a.b.c', '.')) // => ['a', 'b', 'c']
  console.log(dsplit('a/b/c')) // => ['a', 'b', 'c']
  console.log(dsplit('/a/b//c/')) // => ['', 'a', 'b', '', 'c', '']
  console.log(dsplit('a/b//')) // => ['a', 'b', '', '']
  console.log(dsplit('//a/b')) // => ['', '', 'a', 'b']
  console.log(dsplit('//')) // => ['','','']
  console.log(dsplit('/')) // => ['','']
  console.log(dsplit('')) // => ['']
  console.log(dsplit([])) // => []
  console.log(dsplit(undefined)) // => []
```

# Related
* see [djoin](https://www.npmjs.com/package/djoin)
