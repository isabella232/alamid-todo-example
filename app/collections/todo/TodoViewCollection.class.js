"use strict"; // run code in ES5 strict mode

var alamid = require("alamid"),
    todoFilters = require("./todoFilters.js"),
    TodoView = require("../../views/todo/TodoView.class.js"),
    ViewCollection = alamid.ViewCollection,
    value = alamid.util.value;

var TodoViewCollection = ViewCollection.extend("TodoViewCollection", {
    template: '<ul id="todo-list" data-node="views"></ul>',
    constructor: function (template) {
        this._super(TodoView, template);
    },
    setFilter: function (filterType) {
        if (value(filterType).typeOf(String)) {
            filterType = todoFilters[filterType];
        }
        return this._super(filterType);
    }
});

module.exports = TodoViewCollection;