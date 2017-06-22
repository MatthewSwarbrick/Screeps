"use strict";
var roleBuilder = require("./role.builder");
var buildManager = {
    buildExtensions: function () {
        for (var name in Game.rooms) {
            roleBuilder.buildExtensions(Game.rooms[name]);
            roleBuilder.buildRoads(Game.rooms[name]);
        }
    }
};
module.exports = buildManager;
