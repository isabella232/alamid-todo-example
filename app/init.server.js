"use strict";

var alamid = require("alamid");

var server = new alamid.Server();

server.bootstrap();
server.start();