"use strict";

var todoListItemSchema = {

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

module.exports = todoListItemSchema;