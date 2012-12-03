"use strict";

function addToPublicRoom(req, res, next) {

    var session = req.getSession();

    //session.activeRoomID = "public";

    console.log("adding active room");

    next();
}

module.exports = addToPublicRoom;