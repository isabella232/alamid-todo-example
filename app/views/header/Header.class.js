"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoModel = require("../../models/todo/TodoModel.class.js");

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

                    if (event.which === 13) {
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
        todoModel.validate(false, function onTodoModelValidate(validation) {

            if (validation.result === true) {
                todoModel.save(function onSaved(err) {

                    if (err) throw err;

                });
            }

        });

    }

});

module.exports = Header;