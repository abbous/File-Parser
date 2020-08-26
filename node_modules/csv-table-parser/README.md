![build_status](https://travis-ci.org/rchaser53/csv-table-parser.svg?branch=master)
![build_status](https://ci.appveyor.com/api/projects/status/github/rchaser53/csv-table-parser?branch=master&svg=true)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# how to install

```
 npm install csv-table-parser
```

# what's this?

csv file convert to object array like below.

```
const { parser } = require('csv-table-parser')

const input = `name, age, email, isMember
alice, 15, alice@xxx.com, true
bob, 25, bob@xxx.com, false
`

parser(input)
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com", isMember: true },
 *   { name: "bob", age: 25, email: "bob@xxx.com", isMember: false }
 *]
*/
```

you can also convert to array in array.

```
const { parser } = require('csv-table-parser')

const input = `alice, 15, alice@xxx.com, true
bob, 25, bob@xxx.com, false
`

parser(input, { type: 'array' })
/*
 *[
 *   [ "alice", 15, "alice@xxx.com", true ],
 *   [ "bob", 25, "bob@xxx.com", false ]
 *]
*/
```

## options

second parameter is options. the example is below.

### separator

```
const input = `name	age	email	isMember
alice	15	alice@xxx.com	true
bob	25	bob@xxx.com	false
`

parser(input, { separator: '\t' })
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com", isMember: true },
 *   { name: "bob", age: 25, email: "bob@xxx.com", isMember: false }
 *]
*/
```

### startRow

```
const input = `customer name, customer age, customer email for customer service, this user is member or not
name, age, email, isMember
alice, 15, alice@xxx.com, true
bob, 25, bob@xxx.com, false
`

parser(input, { startRow: 1 })
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com", isMember: true },
 *   { name: "bob", age: 25, email: "bob@xxx.com", isMember: false }
 *]
*/
```

### startColumn

```
const input = `no, name, age, email, isMember
1, alice, 15, alice@xxx.com, true
2, bob, 25, bob@xxx.com, false
`

parser(input, { startColumn: 1 })
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com", isMember: true },
 *   { name: "bob", age: 25, email: "bob@xxx.com", isMember: false }
 *]
*/
```

### numberOfColumn

```
const input = `name, age, email, isMember
alice, 15, alice@xxx.com, true
bob, 25, bob@xxx.com, false
`

parser(input, { numberOfColumn: 3 })
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com" },
 *   { name: "bob", age: 25, email: "bob@xxx.com" }
 *]
*/
```

### defaultValue

```
const input = `name, age, email, isMember
alice, 15, alice@xxx.com,
bob, 25, bob@xxx.com, true
`

parser(input, { defaultValue: false })
/*
 *[
 *   { name: "alice", age: 15, email: "alice@xxx.com", isMember: false },
 *   { name: "bob", age: 25, email: "bob@xxx.com", isMember: true }
 *]
*/
```
