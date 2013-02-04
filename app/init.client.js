"use strict";

var alamid = require("alamid"),
    client = alamid.client,
    jQuery = alamid.util.jQuery;

//need for attaching, demo purposes
var Todo = require("./models/todo/TodoModel.class.js");

client.addRoute("*", function () {
    // Overwrite alamid's default 404 Page and do nothing,
    // Because in this app there is only one Page: MainPage.
});

jQuery(document).ready(function onDomReady() {

    //attach references of the TodoModel to the window objects, so you can play with it
    window.Todo = Todo;

    client.start();
    //to be done after websockets have been enabled via app.start()
    client.enableModelSubscribe();
});