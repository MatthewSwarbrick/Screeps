
var roleBuilder = {
    build: function(room: Room, structureType: string) {

        let pathToBuildExtensions = PathFinder.search(room.controller.pos, room.find<Spawn>(FIND_MY_SPAWNS)[0].pos);

        for(var index in pathToBuildExtensions.path) {
            var pathLocation = pathToBuildExtensions.path[index];
            var objectsAtLocation = getObjectsAtAndSurroundingLocation(room, pathLocation);

            if(objectsAtLocation.length > 0) {
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
    objectsAtLocation.push(room.lookAt(position));
    objectsAtLocation.push(room.lookAt(position.x - 1, position.y - 1));
    objectsAtLocation.push(room.lookAt(position.x, position.y - 1));
    objectsAtLocation.push(room.lookAt(position.x + 1, position.y - 1));
    objectsAtLocation.push(room.lookAt(position.x + 1, position.y));
    objectsAtLocation.push(room.lookAt(position.x + 1, position.y + 1));
    objectsAtLocation.push(room.lookAt(position.x, position.y + 1));
    objectsAtLocation.push(room.lookAt(position.x - 1, position.y + 1));
    objectsAtLocation.push(room.lookAt(position.x, position.y - 1));

    return objectsAtLocation;
}

export = roleBuilder;