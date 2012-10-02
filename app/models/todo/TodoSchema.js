"use strict";

var TodoListItemSchema = {

    completed: {
        default: false,
        required: true,
        type: Boolean
    },

    title: {
        required: true,
        type: String
    }

};

module.exports = TodoListItemSchema;