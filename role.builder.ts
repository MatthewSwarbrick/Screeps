
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
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x - 1, position.y - 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x, position.y - 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x + 1, position.y - 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x + 1, position.y)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x + 1, position.y + 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x, position.y + 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x - 1, position.y + 1)));
    objectsAtLocation.push(_.flattenDeep(room.lookAt(position.x, position.y - 1)));

    return objectsAtLocation;
}

export = roleBuilder;