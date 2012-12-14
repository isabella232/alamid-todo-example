"use strict";

var alamid = require("alamid"),
    constants = require("../constants.js"),
    TodoModelCollection = require("../collections/todo/TodoModelCollection.class.js"),
    TodoModel = require("../models/todo/TodoModel.class.js"),
    ViewCollection = alamid.ViewCollection,
    TodoView = require("../views/todo/TodoView.class.js"),
    _ = alamid.util.underscore,
    $ = alamid.util.jQuery,
    Page = alamid.Page;

var MainPage = Page.define("MainPage", {

    $template: require("./MainPage.html"),

    __nodeMap: null,

    __todoModels: null,

    __todoViews: null,

    init: function (ctx) {
        this.Super(ctx);
        this.__nodeMap = this.Super._getNodeMap();
        this.__initViews();
        this.__initModels();
        this.__initNodeEvents();
        this.__initFilter();
    },

    __initModels: function () {
        var self = this;

        //triggers each time a todo-model is created
        TodoModel.on("create", function onCreate(event) {
            self.__todoModels.push(event.model);
        });

        //make it realtime
        this.__initRemotePushHandlers();

        //Fill Collection
        TodoModel.find({}, function onData(err, todoModels) {

            if (err) throw err;

            todoModels = new TodoModelCollection(todoModels.toArray());
            self.__todoModels = todoModels;
            self.__todoViews.bind(self.__todoModels);

            todoModels.on("statsUpdate", self.__onStatsUpdate);
            self.__onStatsUpdate();
        });
    },

    __initViews: function () {
        this.__todoViews = new ViewCollection(TodoView, '<ul id="todo-list" data-node="views"></ul>');
        this.Super._append(this.__todoViews).at("main");
    },

    __initNodeEvents: function () {
        var self = this;

        this.Super._addNodeEvents({
            newTitle: {
                keypress: function (event) {
                    if (event.which === constants.KEY_ENTER) {
                        var todoModel = new TodoModel();

                        todoModel.set("title", this.value.trim());
                        todoModel.save(function onModelSave(err) {
                            if (err) throw err;
                        });
                        this.value = "";
                    }
                }
            },
            all: {
                click: function () {
                    self.__selectFilter($(this));
                }
            },
            active: {
                click: function () {
                    self.__selectFilter($(this));
                }
            },
            completed: {
                click: function () {
                    self.__selectFilter($(this));
                }
            },
            clearCompleted: {
                click: this.__clearCompleted
            },
            toggleAll: {
                click: this.__toggleAll
            }
        });
    },

    __initFilter: function () {
        this.__todoViews.setFilter(filters[this.Super._getParams().path.replace("/", "") || "all"]);
    },

    __onStatsUpdate: function () {
        var nodeMap = this.__nodeMap;

        nodeMap.todoCount.innerText = this.__todoModels.numOfRemaining();
        nodeMap.completedCount.innerText = this.__todoModels.numOfCompleted();
        $(this.__nodeMap.footer).toggle(this.__todoModels.size() > 0);
    },

    __selectFilter: function ($btn) {
        var filterType = $btn.attr("data-node");

        this.__todoViews.setFilter(filters[filterType]);

        $(this.__nodeMap.filters).find("a").removeClass("selected");
        $btn.addClass("selected");
    },

    __toggleAll: function () {
        var checked = this.__todoModels.numOfRemaining() > 0;
        this.__todoModels.each(function setCompleted(todoModel) {
            todoModel.toggle(checked);
        });
    },

    __clearCompleted: function () {
        var completed = this.__todoModels.completed();

        _(completed).each(function deleteCompleted(todoModel) {
            todoModel.destroy(function onModelDestroy(err) {
                if (err) throw err;
            });
        });
    },

    __initRemotePushHandlers : function() {

        var self = this;

        TodoModel.on("remoteCreate", function(event) {
            //add the model to the model-collection
            self.__todoModels.push(event.model);
        });

        TodoModel.on("remoteUpdate", function(event) {
            //update data!
            event.model.set(event.data);
        });

        TodoModel.on("remoteDestroy", function(event) {

            //delete it from the collection
            self.__todoModels.remove(event.model);

            //trigger client-service cleanup
            event.model.destroy(false, function(res) {
                console.log("destroy res", res);
            });
        });
    }
});

var filters = {
    "all": null,
    "active": function filterActive(todoModel) {
        return todoModel.get("completed") === false;
    },
    "completed": function filterCompleted(todoModel) {
        return todoModel.get("completed") === true;
    }
};

module.exports = MainPage;