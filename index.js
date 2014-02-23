var parser = require('./lib/parser');

module.exports = {
	parse: function(source, options) {
		options = options || {};

		var ctors = options.constructors || {};
		
		if (!ctors.money) {
			ctors.money = function(props) {
				return props;
			}
		}

		return parser.parse(source, {
			constructors	: ctors
		});
	}
};