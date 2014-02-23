var parser = require('./lib/parser');

function identity(x) { return x; }

module.exports = {
	parse: function(source, options) {
		options = options || {};

		var ctors = options.constructors || {};
		
		if (!ctors.money)	ctors.money = identity;
		if (!ctors.vec2)	ctors.vec2 	= identity;
		if (!ctors.vec3)	ctors.vec3 	= identity;

		return parser.parse(source, {
			constructors	: ctors
		});
	}
};