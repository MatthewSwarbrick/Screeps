import roleHarvester = require('./role.harvester');
import roleUpgrader = require('./role.upgrader');
import defenceManager = require('./defenceManager');
import buildManager = require('./buildManager');

const SpawnName:string = 'Origins';
const TotalUpgraderCreepCount:number = 10;
const TotalHarvesterCreepCount:number = 20;

export = {

    loop: function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        buildManager.buildExtensions();

        defenceManager.defendRooms();

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if(harvesters.length < TotalHarvesterCreepCount) {
            Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }
        else if(upgraders.length < TotalUpgraderCreepCount) {
             Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
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