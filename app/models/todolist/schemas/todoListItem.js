"use strict";

var todoListItemSchema = {

    completed: {
        default: false,
        required: true,
        type: Boolean
    },

    todo: {
        required: true,
        type: String
    }

};

module.exports = todoListItemSchema;