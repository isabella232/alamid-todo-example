"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js");

var TodoListContentView = View.define("TodoListContentView", {

    /**
     * @type {TodoListView}
     */
    __todoList: null,

    /**
     * @type {ContentFooterView}
     */
    __footer: null,

    $template: require("./TodoListContentView.html"),

    init: function () {

        this.Super();

        this._initSubViews();
    },

    _initSubViews: function () {

        this.__todoList = new TodoListViewCollection();
        this.Super._append(this.__todoList).at("content_view");

    }

});

module.exports = TodoListContentView;