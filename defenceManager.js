"use strict";
var SpawnName = 'Origins';
var defenceManager = {
    defendRooms: function () {
        var _loop_1 = function () {
            var hostiles = [];
            hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0) {
                username = hostiles[0].owner.username;
                Game.notify("User " + username + " spotted in room " + name);
                towers = Game.rooms[name].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
                towers.forEach(function (tower) { return tower.attack(hostiles[0]); });
            }
        };
        var username, towers;
        for (var name in Game.rooms) {
            _loop_1();
        }
    }
};
module.exports = defenceManager;
