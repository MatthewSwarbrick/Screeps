const SpawnName: string = 'Origins';

var roleHarvester = {
    run: function(creep: Creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find<Source>(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.memory.path = creep.pos.findPathTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find<Structure>(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.memory.path = creep.pos.findPathTo(targets[0]);
                }
            }
        }
	}
};

export = roleHarvester;