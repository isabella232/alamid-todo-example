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

var MainPage = Page.extend("MainPage", {

    template: require("./MainPage.html"),

    _todoModels: null,

    _todoViews: null,

    constructor: function (ctx) {
        this._super(ctx);

        this._initViews();
        this._initModels();
        this._initNodeEvents();
        this._initFilter();
    },

    _initModels: function () {
        var self = this;

        //triggers each time a todo-model is created
        TodoModel.on("create", function onCreate(event) {
            self._todoModels.push(event.model);
        }, self);

        //make it realtime
        this._initRemotePushHandlers();

        //Fill Collection
        TodoModel.find({}, function onData(err, todoModels) {

            if (err) throw err;

            todoModels = new TodoModelCollection(todoModels.toArray());
            self._todoModels = todoModels;
            self._todoViews.bind(self._todoModels);

            todoModels.on("statsUpdate", self._onStatsUpdate, self);
            self._onStatsUpdate();
        });
    },

    _initViews: function () {
        this._todoViews = new ViewCollection(TodoView, '<ul id="todo-list" data-node="views"></ul>');
        this._append(this._todoViews).at("main");
    },

    _initNodeEvents: function () {
        var self = this;

        this._addNodeEvents({
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
                click: "_selectFilter"
            },
            active: {
                click: "_selectFilter"
            },
            completed: {
                click: "_selectFilter"
            },
            clearCompleted: {
                click: "_clearCompleted"
            },
            toggleAll: {
                click: "_toggleAll"
            }
        });
    },

    _initFilter: function () {
        this._todoViews.setFilter(filters[this._params.path.replace("/", "") || "all"]);
    },

    _onStatsUpdate: function () {
        var nodeMap = this._nodeMap;

        nodeMap.todoCount.innerText = this._todoModels.numOfRemaining();
        nodeMap.completedCount.innerText = this._todoModels.numOfCompleted();
        $(this._nodeMap.footer).toggle(this._todoModels.size() > 0);
    },

    _selectFilter: function (event) {

        var $btn = $(event.target);
        var filterType = $btn.attr("data-node");

        this._todoViews.setFilter(filters[filterType]);

        $(this._nodeMap.filters).find("a").removeClass("selected");
        $btn.addClass("selected");
    },

    _toggleAll: function () {
        var checked = this._todoModels.numOfRemaining() > 0;
        this._todoModels.each(function setCompleted(todoModel) {
            todoModel.toggle(checked);
        });
    },

    _clearCompleted: function () {
        var completed = this._todoModels.completed();

        _(completed).each(function deleteCompleted(todoModel) {
            todoModel.destroy(function onModelDestroy(err) {
                if (err) throw err;
            });
        });
    },

    _initRemotePushHandlers : function() {

        var self = this;

        TodoModel.on("remoteCreate", function(event) {
            //add the model to the model-collection
            self._todoModels.push(event.model);
        }, self);

        TodoModel.on("remoteUpdate", function(event) {
            //update data!
            event.model.set(event.data);
        }, self);

        TodoModel.on("remoteDestroy", function(event) {

            //delete it from the collection
            self._todoModels.remove(event.model);

            //trigger client-service cleanup
            event.model.destroy(false, function(res) {
                console.log("destroy res", res);
            });
        }, self);
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