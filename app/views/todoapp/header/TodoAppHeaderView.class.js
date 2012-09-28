"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemModel = require("../../../models/todolistitem/TodoListItemModel.class.js"),
    TodoAppHeaderNewTodoView = require("./newtodo/TodoAppHeaderNewTodoView.class.js");

var TodoAppHeaderView = View.define("TodoAppHeaderView", {

    /**
     * @type {TodoListItemModel}
     */
    __newTodoListItem: null,

    /**
     * @type {TodoAppHeaderNewTodoView}
     */
    __newTodo: null,

    $template: require("./TodoAppHeaderView.html"),

    init: function () {

        this.Super();

        this._initSubViews();

    },

    _initSubViews: function () {

        this.__newTodoListItem = new TodoListItemModel();

        this.__newTodo = new TodoAppHeaderNewTodoView();
        this.__newTodo.bind(this.__newTodoListItem);
        this.__newTodo.on("newTodo", this._onNewTodo);

        this.Super._append(this.__newTodo).at("header");

    },

    /**
     * @param {String} newTodoValue
     * @private
     */
    _onNewTodo: function (newTodoValue) {

        var self = this;

        this.__newTodoListItem.set("title", newTodoValue.trim());
        this.__newTodoListItem.validate(false, function onValidated(validation) {

            if (validation.result === true) {

                self.__newTodoListItem.save(function onSaved(err) {

                    if (err) throw err;

                    self.__newTodoListItem = new TodoListItemModel();
                    self.__newTodo.bind(self.__newTodoListItem)

                });
            }

        });
    }

});

module.exports = TodoAppHeaderView;