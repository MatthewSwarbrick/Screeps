"use strict";
var roleHarvester = require("./role.harvester");
var roleUpgrader = require("./role.upgrader");
var defenceManager = require("./defenceManager");
var SpawnName = 'Origins';
var TotalUpgraderCreepCount = 20;
var TotalHarvesterCreepCount = 8;
module.exports = {
    loop: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        defenceManager.defendRooms();
        var harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; });
        var upgraders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'upgrader'; });
        if (harvesters.length < TotalHarvesterCreepCount) {
            var newName = Game.spawns[SpawnName].createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' });
        }
        if (upgraders.length < TotalUpgraderCreepCount) {
            var newName = Game.spawns[SpawnName].createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader' });
        }
        if (Game.spawns[SpawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[SpawnName].spawning.name];
            Game.spawns[SpawnName].room.visual.text('Building ' + spawningCreep.memory.role, Game.spawns[SpawnName].pos.x + 1, Game.spawns[SpawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
};
