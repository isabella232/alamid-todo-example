"use strict"; // run code in ES5 strict mode

var todoFilters = {
    all: null,
    active: function filterActive(todoModel) {
        return todoModel.get("completed") === false;
    },
    completed: function filterCompleted(todoModel) {
        return todoModel.get("completed") === true;
    }
};

module.exports = todoFilters;
