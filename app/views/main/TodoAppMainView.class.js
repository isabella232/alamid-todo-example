"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoAppMainToggleAllView = require("./toggleall/TodoAppMainToggleAllView.class.js"),
    TodoListViewCollection = require("./todolist/TodoListViewCollection.class.js"),
    TodoListItemModel = require("../../../models/todo/TodoModel.class.js");

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

        this._initToggleAll();
        this._initTodoList();
        this._initTodoListItems();

    },

    showAll: function () {
        this.__todoList.setFilter(null);
    },

    showActive: function () {
        this.__todoList.setFilter(function filterActive(todoListItem) {
            return todoListItem.get("completed") === false;
        });
    },

    showCompleted: function () {
        this.__todoList.setFilter(function filterCompleted(todoListItem) {
            return todoListItem.get("completed") == true;
        });
    },

    /**
     * @protected
     */
    _initToggleAll: function () {
        this.__toggleAll = new TodoAppMainToggleAllView();
        this.__toggleAll.on("toggleAll", this._onToggleAll);
        this._toggleToggleAllVisibility();
        this.Super._prepend(this.__toggleAll).at("main");
    },

    /**
     * @protected
     */
    _toggleToggleAllVisibility: function () {
        (this.todoListSize > 0) ? this.__toggleAll.display() : this.__toggleAll.hide();
    },

    /**
     * @protected
     */
    _initTodoList: function () {
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

    /**
     * @protected
     */
    _initTodoListItems: function () {

        var self = this;

        TodoListItemModel.on("create", function onCreate(event) {
            self.__todoListItems.push(event.model);
            self.todoListSize = self.__todoListItems.size();
            self._toggleToggleAllVisibility();
        });

        TodoListItemModel.on("delete", function onDelete(event) {
            self.todoListSize = self.__todoListItems.size();
            self._toggleToggleAllVisibility();
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
         * @param {TodoModel} todoListItemModel
         * @private
         */
        function setComplete(todoListItemModel) {
            todoListItemModel.set("completed", event.complete);
        }

        /**
         * @param {TodoListItemView} todoListItemView
         */
        function setChecked(todoListItemView) {
            todoListItemView.setChecked(event.complete);
        }

        this.__todoListItems.each(setComplete);
        this.__todoList.each(setChecked);
    }

});

module.exports = TodoAppMainView;