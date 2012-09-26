"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = require("./TodoListItemView.html");

var TodoListView = View.define("TodoListView", {

    $template: require("./TodoListViewCollection.html"),

    init: function () {

        this.Super(TodoListItemView);

    }

});

module.exports = TodoListView;