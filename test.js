var xson = require('./');

var inspect = require('util').inspect;

var source = require('fs').readFileSync('test.xson', {encoding: 'utf8'});

console.log(inspect(xson.parse(source, {
	constructors: {
		Foo: function(props) {
			return { type: 'foo', props: props }
		},
		Person: function(props) {
			return { type: 'person', props: props }
		}
	}
}), {depth: null, colors: true}));