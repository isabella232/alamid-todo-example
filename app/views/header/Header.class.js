"use strict";

var alamid = require("alamid"),
    constants = require("../../constants.js"),
    TodoModel = require("../../models/todo/TodoModel.class.js"),
    View = alamid.View;

var Header = View.define("Header", {

    $template: require("./Header.html"),

    init: function () {

        this.Super();
        this.__initNodeEvents();

    },

    __initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
           "title": {
               "keypress": function (event) {
                    if (event.which === constants.KEY_ENTER) {
                        self.__createNewTodoModel(this.value.trim());
                        this.value = "";
                    }
               }
           }

        });

    },

    /**
     * @param {String} todoTitle
     * @private
     */
    __createNewTodoModel: function (todoTitle) {

        var todoModel = new TodoModel();

        todoModel.set("title", todoTitle);
        todoModel.save(function onSaved(err) {
            if (err) throw err;
        });

    }

});

module.exports = Header;