"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js"),
    ContentFooterView = require("./footer/ContentFoorerView.class.js");

var ContentView = View.define("ContentView", {

    /**
     * @type {TodoListView}
     */
    __todoList: null,

    /**
     * @type {ContentFooterView}
     */
    __footer: null,

    $template: require("./ContentView.html"),

    init: function () {

        this.Super();

        this._initSubViews();
    },

    _initSubViews: function () {

        this.__todoList = new TodoListViewCollection();
        this.Super._append(this.__todoList).at("content_view");

        this.__footer = new ContentFooterView();
        this.Super._append(this.__footer).at("content_view");

    }

});

module.exports = ContentView;