var parser  = require('./lib/parser'),
    builtin = require('./lib/builtin');

function identity(x) { return x; }

module.exports = {
    parse: function(source, options) {
        options = options || {};

        var ctors = options.constructors || {};

        if (!ctors.money) {
            ctors.money = function(args) {
                return new builtin.Money(args.major, args.minor, args.currency);
            }
        }

        if (!ctors.vec2) {
            ctors.vec2 = function(args) {
                return new builtin.Vec2(args.x, args.y);
            }
        }

        if (!ctors.vec3) {
            ctors.vec3 = function(args) {
                return new builtin.Vec3(args.x, args.y, args.z);
            }
        }

        return parser.parse(source, {
            constructors    : ctors
        });
    }
};