"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js");

var ContentView = View.define("ContentView", {

    /**
     * @type {TodoListView}
     */
    __todoList: null,

    $template: require("./ContentView.html"),

    init: function () {

        this.Super();

        this.__todoList = new TodoListViewCollection();

    }

});

module.exports = ContentView;