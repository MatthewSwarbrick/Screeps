
var roleBuilder = {
    build: function(room: Room, structureType: string) {

        let pathToBuildExtensions = PathFinder.search(room.controller.pos, room.find<Spawn>(FIND_MY_SPAWNS)[0].pos);

        for(var index in pathToBuildExtensions.path) {
            var pathLocation = pathToBuildExtensions.path[index];
            var objectsAtLocation = getObjectsAtAndSurroundingLocation(room, pathLocation);

            if(objectsAtLocation.filter(o => o.type != "terrain").length > 0) {
                continue;
            }

            if(room.createConstructionSite(pathLocation, structureType) != OK) {
                console.log("Can't create any more extensions");
                break;
            }
        }
	}
};

function getObjectsAtAndSurroundingLocation(room: Room, position: RoomPosition) : any[] {
    let objectsAtLocation = [];
    for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
            objectsAtLocation.push(room.lookAt(position.x + x, position.y + y));
        }
    }

    return _.flattenDeep(objectsAtLocation);
}

export = roleBuilder;