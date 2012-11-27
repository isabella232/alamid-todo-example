"use strict";

var alamid = require("alamid"),
    Header = require("../views/header/Header.class.js"),
    MainView = require("../views/mainView/MainView.class.js"),
    Footer = require("../views/footer/Footer.class.js"),
    _ = alamid.util.underscore,
    Page = alamid.Page;

var TodoModel = require("../models/todo/TodoModel.class.js");

var MainPage = Page.define("MainPage", {

    $template: require("./MainPage.html"),

    /**
     * @type {Header}
     */
    __header: null,

    /**
     * @type {MainView}
     */
    __mainView: null,

    /**
     * @type {Footer}
     */
    __footer: null,

    todoModels: null,

    init: function () {
        this.Super();
        this.__initViews();
        this.__initModels();
    },

    __initModels: function () {
        var self = this;

        TodoModel.on("create", function onCreate(event) {
            self.todoModels.push(event.model);
        });

        TodoModel.find({}, function onData(err, todoModels) {
            if (err) throw err;

            todoModels.on("add", self.__toggleFooter);
            todoModels.on("remove", self.__toggleFooter);

            self.todoModels = todoModels;
            self.__toggleFooter();

            self.__footer.setTodoModels(todoModels);
            self.__mainView.setTodoModels(todoModels);
        });
    },

    __initViews: function () {
        var self = this;

        this.__header = new Header();
        this.Super._append(this.__header).at("todoapp");

        this.__mainView = new MainView();
        this.__mainView.on("toggleAll", this.__toggleAll);
        this.Super._append(this.__mainView).at("todoapp");

        this.__footer = new Footer();
        this.__footer.on("showAll", this.__mainView.showAll);
        this.__footer.on("showActive", this.__mainView.showActive);
        this.__footer.on("showCompleted", this.__mainView.showCompleted);
        this.__footer.on("clearCompleted", this.__clearCompleted);
        this.Super._append(this.__footer).at("todoapp");
    },

    /**
     * @private
     */
    __toggleFooter: function () {
        if (this.todoModels.size() > 0) {
            this.__footer.display();
        } else {
            this.__footer.hide();
        }
    },

    __toggleAll: function (value) {
        this.todoModels.each(function setCompleted(todoModel) {
            todoModel.set("completed", value);
        });
    },

    __clearCompleted: function () {
        var modelsToDelete = this.todoModels.filter(function filterCompletedTodos(todoModel) {
            return todoModel.get("completed") === true;
        });

        _(modelsToDelete).each(function deleteCompleted(todoModel) {
            todoModel.destroy(function onTodoModelDelete(err) {
                if (err) throw err;
            });
        });
    }

});

module.exports = MainPage;