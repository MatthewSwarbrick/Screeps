import roleHarvester = require('./role.harvester');
import roleUpgrader = require('./role.upgrader');
import defenceManager = require('./defenceManager');

const SpawnName:string = 'Origins';
const TotalUpgraderCreepCount:number = 20;
const TotalHarvesterCreepCount:number = 8;

export = {

    loop: function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        defenceManager.defendRooms();

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if(harvesters.length < TotalHarvesterCreepCount) {
            var newName = Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }

        if(upgraders.length < TotalUpgraderCreepCount) {
            var newName = Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        }

        if(Game.spawns[SpawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[SpawnName].spawning.name];
            Game.spawns[SpawnName].room.visual.text(
                'Building ' + spawningCreep.memory.role,
                Game.spawns[SpawnName].pos.x + 1,
                Game.spawns[SpawnName].pos.y,
                {align: 'left', opacity: 0.8});
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
} 