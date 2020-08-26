var test = require('tape')

var dsplit = require('./')

test('dsplit', function (t) {
    t.plan(10)
    t.deepEqual(dsplit('a.b.c', '.'), ['a', 'b', 'c'], "dsplit('a.b.c', '.') // => ['a', 'b', 'c']")
    t.deepEqual(dsplit('a/b/c'), ['a', 'b', 'c'], "dsplit('a/b/c') // => ['a', 'b', 'c']")
    t.deepEqual(dsplit('/a/b//c/'), ['','a','b','','c',''], "dsplit('/a/b//c/') // => ['','a','b','','c','']")
    t.deepEqual(dsplit('a/b//'), ['a', 'b','',''], "dsplit('a/b//') // => ['a', 'b','','']")
    t.deepEqual(dsplit('//a/b'), ['','','a','b'], "dsplit('//a/b') // => ['','','a','b']")
    t.deepEqual(dsplit('//'), ['','',''], "dsplit('//') // => ['','','']")
    t.deepEqual(dsplit('/'), ['',''], "dsplit('/') // => ['','']")
    t.deepEqual(dsplit(''), [''], "dsplit('') // => ['']")
    t.deepEqual(dsplit([]), [], "dsplit([]) // => []")
    t.deepEqual(dsplit(undefined), [], "dsplit(undefined) // => []")
})
