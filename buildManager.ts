import roleBuilder = require('./role.builder');

var buildManager = {
    buildStructures: function() {
        for(var name in Game.rooms) {
            placeExtensions(Game.rooms[name]);
            placeRoads(Game.rooms[name]);
        }
	}
};

function placeExtensions(room: Room) {
        let structureType = STRUCTURE_EXTENSION;
        let pathToBuildStructure = PathFinder.search(room.controller.pos, room.find<Spawn>(FIND_MY_SPAWNS)[0].pos);

        for(var index in pathToBuildStructure.path) {
            var pathLocation = pathToBuildStructure.path[index];
            var objectsAtLocation = getObjectsAtAndSurroundingLocation(room, pathLocation);

            if(objectsAtLocation.filter(o => o.type != "terrain").length > 0) {
                continue;
            }

            if(room.createConstructionSite(pathLocation, structureType) != OK) {
                console.log("Can't create any more " + structureType);
                break;
            }
        }
	}

function placeRoads(room: Room) {
    let structureType = STRUCTURE_ROAD;
    let pathToBuildStructures = [];
    for(let index in Game.creeps)
    {
        let path = Game.creeps[index].memory.path;

        if(path) {
            pathToBuildStructures.push(path);
        }
    }

    for(let index in pathToBuildStructures) {
        for(let pathIndex in pathToBuildStructures[index]) {
            let pathLocation = pathToBuildStructures[index][pathIndex];
            let objectsAtLocation = room.lookAt(pathLocation.x, pathLocation.y);
            
            if(objectsAtLocation.filter(o => o.type != "terrain").length > 0) {
                continue;
            }

            if(room.createConstructionSite(pathLocation.x, pathLocation.y, structureType) != OK) {
                console.log("Can't create any more " + structureType);
                break;
            }
        }
    }
}

function getObjectsAtAndSurroundingLocation(room: Room, position: RoomPosition) : any[] {
    let objectsAtLocation = [];
    for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
            objectsAtLocation.push(room.lookAt(position.x + x, position.y + y));
        }
    }

    return _.flattenDeep(objectsAtLocation);
}

export = buildManager;