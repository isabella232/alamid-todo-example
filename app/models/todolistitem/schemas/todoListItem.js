"use strict";

var todoListItemSchema = {

    completed: {
        default: false,
        required: true,
        type: Boolean
    },

    todoName: {
        required: true,
        type: String
    }

};

module.exports = todoListItemSchema;