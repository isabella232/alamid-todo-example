"use strict";

var alamid = require("alamid"),
    View = alamid.View,
    ViewCollection = alamid.ViewCollection;

var TodoModel = require("../../models/todo/TodoModel.class.js"),
    TodoView = require("./todoView/TodoView.class.js");

var MainView = View.define("MainView", {

    $template: require("./MainView.html"),

    todoModels: null,

    __todoViews: null,

    init: function () {

        this.Super();
        this.__initTodoViews();
        this.__initNodeEvents();

    },

    showAll: function () {
        this.__todoViews.setFilter(null);
    },

    showActive: function () {
        this.__todoViews.setFilter(function filterActive(todoModel) {
            console.log(todoModel.get("title"), todoModel.get("completed"));
            return todoModel.get("completed") === false;
        });
    },

    showCompleted: function () {
        this.__todoViews.setFilter(function filterCompleted(todoModel) {
            console.log(todoModel.get("title"), todoModel.get("completed"));
            return todoModel.get("completed") === true;
        });
    },

    setTodoModels: function (todoModels) {
        this.todoModels = todoModels;
        this.__todoViews.bind(todoModels);
    },

    __initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "toggle-all": {
                "click": function () {
                    self.Super.emit("toggleAll", this.checked);
                }
            }
        });

    },

    __initTodoViews: function () {

        this.__todoViews = new ViewCollection(TodoView, '<ul id="todo-list" data-node="views"></ul>');
        this.__todoViews.delegate("deleteTodo", function onDeleteTodo(view) {
            view.getModel().delete(function onDelete(err) {
                if (err) throw err;
            });
        });
        this.__todoViews.delegate("toggleTodoStatus", function onToggleTodoStatus(view) {
            var todoModel = view.getModel();

            //toggle completed
            todoModel.set("completed", !todoModel.get("completed"));

            todoModel.save(function onSave(err) {
                if (err) throw err;
            });

        });
        this.Super._append(this.__todoViews).at("main");

    }

});

module.exports = MainView;