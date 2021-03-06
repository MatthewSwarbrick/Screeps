const SpawnName: string = 'Origins';

var roleUpgrader = {
    run: function(creep: Creep) {
	    if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.memory.path = creep.pos.findPathTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find<Source>(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.memory.path = creep.pos.findPathTo(sources[0]);
            }
        }
	}
};

export = roleUpgrader;