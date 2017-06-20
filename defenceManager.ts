const SpawnName: string = 'Origins';

var defenceManager = {
    defendRooms: function() {
        for(var name in Game.rooms) {
            let hostiles = [];
            hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                Game.notify(`User ${username} spotted in room ${name}`);
                var towers = Game.rooms[name].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                towers.forEach((tower : Tower)  => tower.attack(hostiles[0]));
            }
        }
	}
};

export = defenceManager;