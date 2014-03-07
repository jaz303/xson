function Base() {}

function Money(major, minor, currency) {
	this.major = major;
	this.minor = minor;
	this.currency = currency;
}

function Vec2(x, y) {
	this.x = x;
	this.y = y;
}

function Vec3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

var inherits = require('util').inherits;

inherits(Money,	Base);
inherits(Vec2, 	Base);
inherits(Vec3, 	Base);

exports.Base 	= Base;
exports.Money	= Money;
exports.Vec2	= Vec2;
exports.Vec3 	= Vec3;