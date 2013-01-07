"use strict"; // run code in ES5 strict mode

var alamid = require("alamid"),
    ModelCollection = alamid.ModelCollection,
    TodoModel = require("../../models/todo/TodoModel.class.js");

var TodoModelCollection = ModelCollection.extend("TodoModelCollection", {
    __completed: 0,
    __remaining: 0,
    constructor: function (models) {
        this._super(TodoModel, models);

        this.__updateStats = this.__updateStats.bind(this);

        this.on("add", this.__updateStats);
        this.on("remove", this.__updateStats);
        this.on("change", this.__updateStats);

        this.__updateStats();
    },
    completed: function () {
        return this.filter(function (todoModel) {
            return todoModel.get("completed") === true;
        });
    },
    numOfCompleted: function () {
        return this.__completed;
    },
    numOfRemaining: function () {
        return this.__remaining;
    },
    __updateStats: function () {
        var self = this;

        this.__completed = 0;
        this.__remaining = 0;

        this.each(function (todoModel) {
            if (todoModel.get("completed")) {
                self.__completed++;
            } else {
                self.__remaining++;
            }
        });

        this.emit("statsUpdate");
    }
});

module.exports = TodoModelCollection;