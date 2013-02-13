"use strict";

var alamid = require("alamid"),
    client = alamid.client,
    jQuery = alamid.util.jQuery;

//attach references of the TodoModel to the window objects, so you can play with it
window.Todo = require("./models/todo/TodoModel.class.js");

client.addRoute("*", "/");

jQuery(document).ready(function onDomReady() {
    client.start();
    //to be done after websockets have been enabled via app.start()
    client.enableModelSubscribe();
});