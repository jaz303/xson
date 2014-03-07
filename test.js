var xson = require('./');



// var source = require('fs').readFileSync('test.xson', {encoding: 'utf8'});

// console.log(inspect(xson.parse(source, {
// 	constructors: {
// 		Foo: function(props) {
// 			return { type: 'foo', props: props }
// 		},
// 		Person: function(props) {
// 			return { type: 'person', props: props }
// 		}
// 	}
// }), {depth: null, colors: true}));

var input = [
	1,
	true,
	null,
	[ "foo", "bar", "baz" ],
	new xson.Money(1, 20, 'GBP'),
	new xson.Vec2(3.4, 5),
	new xson.Vec3(1, 2, 3),
	new Date(2014, 6, 28, 15, 12, 00, 123),
	{a: 1, b: 2, c: false}
];

var inspect = require('util').inspect;

console.log(inspect(input, {depth: null, colors: true}));

var str = xson.stringify(input);

console.log(str);

var parsed = xson.parse(str);

console.log(inspect(parsed, {depth: null, colors: true}));
