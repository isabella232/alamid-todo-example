"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = View.define("TodoListItemView", {

    $template: require("./TodoListItem.html")

});

module.exports = TodoListItemView;