var parser      = require('./lib/parser'),
    builtin     = require('./lib/builtin'),
    serialize   = require('./lib/serializer');

function identity(x) { return x; }

function builtinToStructure(thing) {
    if (thing instanceof builtin.Money) {
        return ['money', thing.major, thing.minor, thing.currency];
    } else if (thing instanceof builtin.Vec2) {
        return ['vec2', thing.x, thing.y];
    } else if (thing instanceof builtin.Vec3) {
        return ['vec3', thing.x, thing.y, thing.z];
    } else {
        return null;
    }
}

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
    },

    stringify: function(object, options) {
        options = options || {};

        var toStructure = options.toStructure || builtinToStructure;

        return serialize(object, {
            toStructure     : toStructure
        });
    },

    Money   : builtin.Money,
    Vec2    : builtin.Vec2,
    Vec3    : builtin.Vec3
};