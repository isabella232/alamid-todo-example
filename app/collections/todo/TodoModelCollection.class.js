"use strict"; // run code in ES5 strict mode

var alamid = require("alamid"),
    TodoModel = require("../../models/todo/TodoModel.class.js"),
    todoFilters = require("./todoFilters.js"),
    ModelCollection = alamid.ModelCollection,
    _ = alamid.util.underscore,
    isCompleted = todoFilters.completed;

var TodoModelCollection = ModelCollection.extend("TodoModelCollection", {
    _completed: 0,
    _remaining: 0,
    constructor: function (models) {
        this._super(TodoModel, models);

        this._updateStats = this._updateStats.bind(this);

        this.on("add", this._updateStats);
        this.on("remove", this._updateStats);
        this.on("change", this._updateStats);

        this._updateStats();
    },
    completed: function () {
        return this.filter(isCompleted);
    },
    numOfCompleted: function () {
        return this._completed;
    },
    numOfRemaining: function () {
        return this._remaining;
    },
    toggleAll: function () {
        var checked = this._remaining > 0;

        this.each(function setCompleted(todoModel) {
            todoModel.toggle(checked);
        });
    },
    clearCompleted: function () {
        this.each(function destroyCompletedTodos(todoModel) {
            if (isCompleted(todoModel)) {
                todoModel.destroy(onModelCallback);
            }
        });
    },

    _updateStats: function () {
        var self = this;

        this._completed = 0;
        this._remaining = 0;

        this.each(function (todoModel) {
            if (todoModel.get("completed")) {
                self._completed++;
            } else {
                self._remaining++;
            }
        });

        this.emit("statsUpdate");
    }
});

// You should do proper error handling here
function onModelCallback(err) {
    if (err) throw err;
}

module.exports = TodoModelCollection;