const SpawnName: string = 'Origins';

var roleHarvester = {
    run: function(creep: Creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find<Source>(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns[SpawnName], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[SpawnName]);
            }
        }
	}
};

export = roleHarvester;