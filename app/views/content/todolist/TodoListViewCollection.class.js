"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = require();

var TodoListView = View.define("TodoListView", {

    $template: require("./TodoListViewCollection.html"),

    init: function () {

        this.Super(TodoListItemView);

    }

});

module.exports = TodoListView;