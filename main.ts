import roleHarvester = require('./role.harvester');
import roleUpgrader = require('./role.upgrader');
import roleBuilder = require('./role.builder');
import defenceManager = require('./defenceManager');
import buildManager = require('./buildManager');

const SpawnName:string = 'Origins';
const TotalBuilderCreepCount:number = 6;
const TotalUpgraderCreepCount:number = 8;
const TotalHarvesterCreepCount:number = 10;

export = {

    loop: function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        buildManager.buildStructures();
        defenceManager.defendRooms();

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if(harvesters.length < TotalHarvesterCreepCount) {
            Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }
        else if(upgraders.length < TotalUpgraderCreepCount) {
             Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        }
        else if(builders.length < TotalBuilderCreepCount) {
            Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
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
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }
} 