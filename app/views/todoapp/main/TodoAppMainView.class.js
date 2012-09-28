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
     * @type {Number}
     */
    todoListSize: 0,

    /**
     * @type {ModelCollection}
     */
    __todoListItems: null,

    $template: require("./TodoAppMainView.html"),

    init: function () {

        var self = this;

        this.Super();

        this._initSubViews();

        this._initTodoListItems();
        TodoListItemModel.on("create", function onCreate(event) {
            self.__todoListItems.push(event.model);
            self.todoListSize = self.__todoListItems.size();
        });
        TodoListItemModel.on("delete", function onDelete(event) {
            self.todoListSize = self.__todoListItems.size();
        });

    },

    _initSubViews: function () {

        this.__todoList = new TodoListViewCollection();
        this.Super._append(this.__todoList).at("main");

        this.__todoList.delegate("deleteTodo", function onDeleteTodo(view) {

            view.getModel().delete(function onDelete(err) {
                if (err) throw err;
            });

        });

        this.__todoList.delegate("toggleTodoStatus", function onToggleTodoStatus(view) {
            var todoListItem = view.getModel();

            if (todoListItem.get("completed") === false) {
                todoListItem.set("completed", true);
            } else {
                todoListItem.set("completed", false);
            }

            todoListItem.save(function onSave(err) {
                if (err) throw err;
            });

        });

    },

    _initTodoListItems: function () {

        var self = this;

        TodoListItemModel.find({}, function onData(err, todoListItems) {

            if (err) {
                throw err;
            }

            self.__todoListItems = todoListItems;
            self.todoListSize = todoListItems.size();
            self.__todoList.bind(todoListItems);

        });
    }

});

module.exports = TodoAppMainView;