"use strict";

var alamid = require("alamid");

var server = new alamid.Server();

//middleware
var addToPublicRoom = require("./middleware/addToPublicRoom.js");

server.addRoute("create", "/services/*", addToPublicRoom);
//we need a middleware to set data and ids before create to be available for pushHandler
//maybe that's not the best solution ?!

server.bootstrap();
server.start();