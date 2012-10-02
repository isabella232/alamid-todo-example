"use strict";

var alamid = require("alamid"),
    ViewCollection = alamid.ViewCollection;

var TodoListItemView = require("./TodoListItemView.class.js");

var TodoListViewCollection = ViewCollection.define("TodoListViewCollection", {

    $template: require("./TodoListViewCollection.html"),

    init: function () {

        this.Super(TodoListItemView);

    }

});

module.exports = TodoListViewCollection;