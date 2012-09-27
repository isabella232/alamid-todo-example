"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js"),
    TodoListItemModel = require("../../../../models/todolistitem/TodoListItemModel.class.js");

var TodoListContentView = View.define("TodoListContentView", {

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

    $template: require("./TodoListContentView.html"),

    init: function () {

        var self = this;

        this.Super();

        this._initSubViews();
        this._initSubViewData();

        TodoListItemModel.on("create", function onCreate(todoListItemCreateEvent) {
            self.__todoListItems.push(todoListItemCreateEvent.model);
        });

    },

    _initSubViews: function () {

        this.__todoList = new TodoListViewCollection();
        this.Super._append(this.__todoList).at("content_view");

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

module.exports = TodoListContentView;