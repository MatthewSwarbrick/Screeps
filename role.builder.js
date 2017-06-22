"use strict";
var roleBuilder = {
    buildExtensions: function (room) {
        var structureType = STRUCTURE_EXTENSION;
        var pathToBuildStructure = PathFinder.search(room.controller.pos, room.find(FIND_MY_SPAWNS)[0].pos);
        for (var index in pathToBuildStructure.path) {
            var pathLocation = pathToBuildStructure.path[index];
            var objectsAtLocation = getObjectsAtAndSurroundingLocation(room, pathLocation);
            if (objectsAtLocation.filter(function (o) { return o.type != "terrain"; }).length > 0) {
                continue;
            }
            if (room.createConstructionSite(pathLocation, structureType) != OK) {
                console.log("Can't create any more " + structureType);
                break;
            }
        }
    },
    buildRoads: function (room) {
        var structureType = STRUCTURE_ROAD;
        var pathToBuildStructures = [];
        for (var index in Game.creeps) {
            var path = Game.creeps[index].memory.path;
            if (path) {
                pathToBuildStructures.push(path);
            }
        }
        for (var index in pathToBuildStructures) {
            for (var pathIndex in pathToBuildStructures[index]) {
                var pathLocation = pathToBuildStructures[index][pathIndex];
                var objectsAtLocation = room.lookAt(pathLocation);
                if (objectsAtLocation.filter(function (o) { return o.type != "terrain"; }).length > 0) {
                    continue;
                }
                if (room.createConstructionSite(pathLocation, structureType) != OK) {
                    console.log("Can't create any more " + structureType);
                    break;
                }
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
