"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoAppMainToggleAllView = require("./toggleall/TodoAppMainToggleAllView.class.js"),
    TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js"),
    TodoListItemModel = require("../../../models/todolistitem/TodoListItemModel.class.js");

var TodoAppMainView = View.define("TodoAppMainView", {

    /**
     * @type {Number}
     */
    todoListSize: 0,

    /**
     * @type {TodoListView}
     */
    __todoList: null,

    /**
     * @type {TodoAppMainToggleAllView}
     */
    __toggleAll: null,

    /**
     * @type {ModelCollection}
     */
    __todoListItems: null,

    $template: require("./TodoAppMainView.html"),

    init: function () {

        this.Super();

        this._initSubViews();
        this._initTodoListItems();

    },

    _initSubViews: function () {

        this.__toggleAll = new TodoAppMainToggleAllView();
        this.__toggleAll.on("toggleAll", this._onToggleAll);
        this._toggleToggleAĺl();
        this.Super._prepend(this.__toggleAll).at("main");


        this.__todoList = new TodoListViewCollection();
        this.__todoList.delegate("deleteTodo", function onDeleteTodo(view) {
            view.getModel().delete(function onDelete(err) {
                if (err) throw err;
            });
        });
        this.__todoList.delegate("toggleTodoStatus", function onToggleTodoStatus(view) {
            var todoListItem = view.getModel();

            //toggle completed
            todoListItem.set("completed", !todoListItem.get("completed"));

            todoListItem.save(function onSave(err) {
                if (err) throw err;
            });

        });
        this.Super._append(this.__todoList).at("main");

    },

    _initTodoListItems: function () {

        var self = this;

        TodoListItemModel.on("create", function onCreate(event) {
            self.__todoListItems.push(event.model);
            self.todoListSize = self.__todoListItems.size();
            self._toggleToggleAĺl();
        });

        TodoListItemModel.on("delete", function onDelete(event) {
            self.todoListSize = self.__todoListItems.size();
            self._toggleToggleAĺl();
        });

        TodoListItemModel.find({}, function onData(err, todoListItems) {

            if (err) {
                throw err;
            }

            self.__todoListItems = todoListItems;
            self.todoListSize = todoListItems.size();
            self.__todoList.bind(todoListItems);

        });
    },

    /**
     * @param {Object} event
     * @protected
     */
    _onToggleAll: function (event) {

        /**
         * @param {TodoListItemModel} todoListItem
         * @private
         */
        function changeComplete(todoListItem) {
            todoListItem.set("completed", event.complete);
        }

        this.__todoList.each(changeComplete);
    },

    _toggleToggleAĺl: function () {
        (this.todoListSize > 0) ? this.__toggleAll.display() : this.__toggleAll.hide();
    }

});

module.exports = TodoAppMainView;