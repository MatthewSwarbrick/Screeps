"use strict";
var roleBuilder = {
    build: function (room, structureType) {
        var pathToBuildExtensions = PathFinder.search(room.controller.pos, room.find(FIND_MY_SPAWNS)[0].pos);
        for (var index in pathToBuildExtensions.path) {
            var pathLocation = pathToBuildExtensions.path[index];
            var objectsAtLocation = getObjectsAtAndSurroundingLocation(room, pathLocation);
            if (objectsAtLocation.filter(function (o) { return o.type != "terrain"; }).length > 0) {
                continue;
            }
            if (room.createConstructionSite(pathLocation, structureType) != OK) {
                console.log("Can't create any more extensions");
                break;
            }
        }
    }
};
function getObjectsAtAndSurroundingLocation(room, position) {
    var objectsAtLocation = [];
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
module.exports = roleBuilder;
