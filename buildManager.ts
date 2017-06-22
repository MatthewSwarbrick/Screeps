import roleBuilder = require('./role.builder');

var buildManager = {
    buildExtensions: function() {
        for(var name in Game.rooms) {
            roleBuilder.build(Game.rooms[name], STRUCTURE_EXTENSION);
            roleBuilder.build(Game.rooms[name], STRUCTURE_ROAD);
        }
	}
};

export = buildManager;