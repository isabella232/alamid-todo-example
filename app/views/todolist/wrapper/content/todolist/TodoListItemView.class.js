"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = View.define("TodoListItemView", {

    $template: require("./TodoListItemView.html")

});

module.exports = TodoListItemView;