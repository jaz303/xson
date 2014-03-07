module.exports = serialize;

var json = JSON.stringify;

function pad2(v) {
	return v < 10 ? ('0' + v) : v;
}

function pad3(v) {
	if (v < 10) {
		return '00' + v;
	} else if (v < 100) {
		return '0' + v;
	} else {
		return v;
	}
}

function serialize(thing, options) {

	var buffer 		= '',
		toStructure	= options.toStructure;

	function pairs(obj) {
		var i = 0;
		for (var k in obj) {
			if (i++) buffer += ',';
			buffer += json(k) + ':';
			one(obj[k]);
		}
	}

	function one(thing) {
		if (typeof thing === 'string'
			|| typeof thing === 'number'
			|| typeof thing === 'boolean'
			|| thing === null) {
			buffer += json(thing);
		} else if (Array.isArray(thing)) {
			buffer += '[';
			for (var i = 0; i < thing.length; ++i) {
				if (i) buffer += ',';
				one(thing[i]);
			}
			buffer += ']';
		} else if (thing instanceof Date) {
			buffer += thing.getFullYear() + '-'
						+ pad2(thing.getMonth() - 1) + '-'
						+ pad2(thing.getDate()) + 'T'
						+ pad2(thing.getHours()) + ':'
						+ pad2(thing.getMinutes()) + ':'
						+ pad2(thing.getSeconds()) + '.'
						+ pad3(thing.getMilliseconds());
		} else {
			var struc = toStructure(thing);
			if (struc) {
				if (struc[0] === 'money') {
					buffer += '$' + struc[1] + '.' + struc[2] + (struc[3] || '');
				} else if (struc[0] === 'vec2') {
					buffer += '<' + struc[1] + ',' + struc[2] + '>';
				} else if (struc[0] === 'vec3') {
					buffer += '<' + struc[1] + ',' + struc[2] + ',' + struc[3] + '>';
				} else {
					buffer += struc[0] + '(';
					pairs(struc[1]);
					buffer += ')'
				}
			} else {
				buffer += '{';
				pairs(thing);
				buffer += '}';
			}
		}
	}

	one(thing);

	return buffer;

}