"use strict"; // run code in ES5 strict mode

var alamid = require("alamid"),
    ModelCollection = alamid.ModelCollection,
    TodoModel = require("../../models/todo/TodoModel.class.js");

var TodoModelCollection = ModelCollection.define("TodoModelCollection", {
    __completed: 0,
    __remaining: 0,
    init: function (models) {
        this.Super(TodoModel, models);
        this.Super.on("add", this.__updateStats);
        this.Super.on("remove", this.__updateStats);
        this.Super.on("change", this.__updateStats);
        this.__updateStats();
    },
    completed: function () {
        return this.Super.filter(function (todoModel) {
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

        this.Super.each(function (todoModel) {
            if (todoModel.get("completed")) {
                self.__completed++;
            } else {
                self.__remaining++;
            }
        });

        this.Super.emit("statsUpdate");
    }
});

module.exports = TodoModelCollection;