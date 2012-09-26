"use strict";
var alamid = require("alamid"),
    app = alamid.app,
    jQuery = alamid.util.jQuery;

var TodoListItem = require("./models/todolistitem/TodoListItemModel.class.js");

window.TodoListItem = TodoListItem;

jQuery(document).ready(function onDomReady() {
    app.start();
});