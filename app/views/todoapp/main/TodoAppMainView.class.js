"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js"),
    TodoListItemModel = require("../../../models/todolistitem/TodoListItemModel.class.js");

var TodoAppMainView = View.define("TodoAppMainView", {

    /**
     * @type {TodoListView}
     */
    __todoList: null,

    /**
     * @type {ContentFooterView}
     */
    __footer: null,

    /**
     * @type {ModelCollection}
     */
    __todoListItems: null,

    $template: require("./TodoAppMainView.html"),

    init: function () {

        var self = this;

        this.Super();

        this._initSubViews();
        this._initSubViewData();

        TodoListItemModel.on("create", function onCreate(event) {
            self.__todoListItems.push(event.model);
        });

    },

    _initSubViews: function () {

        this.__todoList = new TodoListViewCollection();
        this.Super._append(this.__todoList).at("main");

    },

    _initSubViewData: function () {

        var self = this;

        TodoListItemModel.find({}, function onData(err, todoListItems) {

            if (err) {
                throw err;
            }

            self.__todoListItems = todoListItems;
            self.__todoList.bind(todoListItems);

        });
    }

});

module.exports = TodoAppMainView;