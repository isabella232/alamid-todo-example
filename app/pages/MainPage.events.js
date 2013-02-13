"use strict"; // run code in ES5 strict mode

var alamid = require("alamid"),
    constants = require("../constants.js"),
    $ = alamid.util.jQuery;

var MainPageEvents = {
    domEvents: {
        newTodo: {
            keypress: "_onNewTodoKeyPress"
        },
        all: {
            click: "_onFilterBtnClick"
        },
        active: {
            click: "_onFilterBtnClick"
        },
        completed: {
            click: "_onFilterBtnClick"
        },
        clearCompleted: {
            click: "clearCompleted"
        },
        toggleAll: {
            click: "toggleAll"
        }
    },

    _onNewTodoKeyPress: function (event) {
        var input = event.target;

        if (event.which === constants.KEY_ENTER) {
            this.createNewTodo(input.value.trim());
            input.value = "";
        }
    },

    _onFilterBtnClick: function (event) {
        this.setFilter($(event.target).attr("data-node"));
    }
};

module.exports = MainPageEvents;