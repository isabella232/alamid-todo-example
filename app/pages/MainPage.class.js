"use strict";

var alamid = require("alamid"),
    TodoModelCollection = require("../collections/todo/TodoModelCollection.class.js"),
    TodoViewCollection = require("../collections/todo/TodoViewCollection.class.js"),
    TodoModel = require("../models/todo/TodoModel.class.js"),
    TodoView = require("../views/todo/TodoView.class.js"),
    mainPageEvents = require("./MainPage.events.js"),
    _ = alamid.util.underscore,
    $ = alamid.util.jQuery,
    Page = alamid.Page;

var MainPage = Page.extend("MainPage", mainPageEvents, {

    template: require("./MainPage.html"),

    _todoModels: null,

    _todoViews: null,

    constructor: function (ctx) {
        var filter = ctx.path.replace("/", "") || "all",
            todoViews;

        this._super(ctx);

        this._todoViews = todoViews = new TodoViewCollection();
        this.setFilter(filter);
        this.append(todoViews).at("main");

        this._initModels();
    },

    createNewTodo: function (title) {
        var todoModel = new TodoModel();

        todoModel.set("title", title);
        todoModel.save(onModelCallback);
    },

    setFilter: function (filterType) {
        this._todoViews.setFilter(filterType);

        $(this._nodes.filters).find("a").removeClass("selected");
        $(this._nodes[filterType]).addClass("selected");
    },

    toggleAll: function () {
        this._todoModels.toggleAll();
    },

    clearCompleted: function () {
        this._todoModels.clearCompleted();
    },

    updateStats: function () {
        var nodes = this._nodes;

        nodes.todoCount.innerText = this._todoModels.numOfRemaining();
        nodes.completedCount.innerText = this._todoModels.numOfCompleted();
        $(nodes.footer).toggle(this._todoModels.size() > 0);
    },

    _initModels: function () {
        var self = this;

        //triggers each time a todo-model is created
        TodoModel.on("create", function onCreate(event) {
            self._todoModels.push(event.model);
        });

        //make it realtime
        this._initRemotePushHandlers();

        //Fill Collection
        TodoModel.find({}, function onData(err, todoModels) {

            if (err) throw err;

            todoModels = new TodoModelCollection(todoModels.toArray());
            self._todoModels = todoModels;
            self._todoViews.bind(self._todoModels);

            todoModels.on("statsUpdate", self.updateStats, self);
            self.updateStats();
        });
    },

    _initRemotePushHandlers : function() {
        var self = this;

        TodoModel.on("remoteCreate", function(event) {
            //add the model to the model-collection
            self._todoModels.push(event.model);
        });

        TodoModel.on("remoteUpdate", function(event) {
            //update data!
            event.model.set(event.data);
        });

        TodoModel.on("remoteDestroy", function(event) {

            //delete it from the collection
            self._todoModels.remove(event.model);

            //trigger client-service cleanup
            event.model.destroy(false, function(res) {
                console.log("destroy res", res);
            });
        });
    }
});

// You should do proper error handling here
function onModelCallback(err) {
    if (err) throw err;
}

module.exports = MainPage;