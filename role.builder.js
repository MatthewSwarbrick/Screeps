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
    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            objectsAtLocation.push(room.lookAt(position.x + x, position.y + y));
        }
    }
    return _.flattenDeep(objectsAtLocation);
}
module.exports = roleBuilder;
