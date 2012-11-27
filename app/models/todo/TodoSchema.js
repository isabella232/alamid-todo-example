"use strict";

var TodoSchema = {

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

module.exports = TodoSchema;