# xson

## Installation

    $ npm install xson

## Require

	var xson = require('xson');

## API

### `xson.parse(string [, options])`

Parse an XSON string and return the result. Valid `options` keys:

  * `constructors`: a map of object type names to their constructor functions. Whenever the XSON parser encounters a named object (or indeed a vector or money), the corresponding constructor will be called receiving the object's properties as a parameter. For example, to handle the following XSON:

    ```
    Person(name: "Jason")
    ```

  one would call `parse` in the following manner:
 
    ```
    xson.parse('Person(name: "Jason")', {
    	constructors: {
    		Person: function(props) {
    			return new PersonModel(props.name);
    		}
    	}
	});
	```

	Note that despite the name "constructors", such functions are invoked by regular function calls, i.e. `Person(props)` and not `new Person(props)`.

### `xson.stringify(object, [, options])`

Convert an object structure to an XSON string and return it. Valid `options` keys:

  * `toStructure`: a function that is called whenever the serializer encounters a Javascript object type (excluding `null` and arrays) to determine how it should be encoded. Returns one of the following:

    * for money: `['money', major, minor, currency]`. Major/minor should be integers and currency is an optional string.
    * for vectors: `['vec2', x, y]` or `['vec3', x, y, z]`.
    * for named objects: `['ConstructorName', properties]`.
    * for all other objects, return `null`. XSON will then serialize the object as a dictionary (i.e. standard JSON object).

  The default implementation of `toStructure` will detect XSON's built-in `Money`, `Vec2` and `Vec3` types and encode them accordingly. All other objects will be encoded as XSON dictionaries.

## Syntax

### Atomic Types

#### Boolean

In addition to standard JSON syntax, `on`, `off`, `yes` and `no` are acceptable:

```
true
false
on
off
yes
no
```

#### Dates

Date are expressed in ISO-8601. When time is also present seconds and milliseconds may be omitted for convience's sake. When so omitted, they default to zero.

```
2014-03-07
2014-03-07T23:02
2014-03-07T23:02:28
2014-03-07T23:02:28.123
```

#### Number

Standard integers and floats are supported:

```
128
12.3
```

In addition you may use hex and binary literals:

```
0xFF0F
0b11010111
```

Any numeric literals may increase readability by using `_`:

```
1_000_000
```

#### String

```
"this is a string"
```

### Composite Types

#### Array

As per JSON.

```
[]
[1, 2, 3]
[$3GBP, $10.75USD]
```

#### Dictionaries

As per JSON objects. Quoting of keys is optional for simple identifiers.

```
{}
{foo: "bar"}
{"a key with spaces and punctuation!": false}
```

#### Money

The money type is denoted by a `$` prefix followed by decimal number and optional currency.

```
$2
$2.50
$2.50USD
```

#### Objects

Objects are represented by a named constructor followed by a parenthesized property list. The format of the property list is identical to that of a dictionary.

```
Person(name: "Jason", location: "Glasgow")
```

#### Vectors

XSON supports 2- and 3- component numeric vectors:

```
<1,2>
<2.3,6.7,0>
```

## TODO

  * object references
  * escaped unicode literals
