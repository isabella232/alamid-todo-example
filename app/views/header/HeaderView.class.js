"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoModel = require("../../models/todo/TodoModel.class.js");

var HeaderView = View.define("HeaderView", {

    $template: require("./HeaderView.html"),

    /**
     * @type {TodoModel}
     */
    __newTodo: null,

    init: function () {

        this.Super();
        this.__initNodeEvents();
        this.__initModel();

    },

    __initNodeEvents: function () {
        var self = this;

        this.Super._addNodeEvents({
           title: {
               keypress: function onKeypress(event) {
                    if (event.which === 13) {
                        self.__onNewTodo(this.value.trim());
                    }
               }
           }

        });
    },

    __initModel: function () {
        this.__newTodo = new TodoModel();
    },

    /**
     * @param {String} newTodoValue
     * @private
     */
    __onNewTodo: function (newTodoValue) {

        var self = this,
            newTodo = this.__newTodo;

        newTodo.set("title", newTodoValue);
        newTodo.validate(false, function onNewTodoValidate(validation) {

            if (validation.result === true) {
                newTodo.save(function onSaved(err) {

                    if (err) throw err;

                    self.__initModel();

                });
            }

        });
    }

});

module.exports = HeaderView;