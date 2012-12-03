"use strict";

var alamid = require("alamid"),
    app = alamid.app,
    jQuery = alamid.util.jQuery;

app.addRoute("*", function () {
    // Overwrite alamid's default 404 Page and do nothing,
    // Because in this app there is only one Page: MainPage.
});

var TodoListItem = require("./models/todo/TodoModel.class.js");
window.TodoListItem = TodoListItem;

/*
TodoListItem.on("remoteCreate", function(event) {
    console.log("remoteCreate", event);
});
*/

window._ = require("alamid").util.underscore;

jQuery(document).ready(function onDomReady() {
    app.start();
});