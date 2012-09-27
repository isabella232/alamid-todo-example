"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemModel = require("../../../../models/todolistitem/TodoListItemModel.class.js"),
    NewTodoInputView = require("./newtodoinputview/NewTodoInputView.class.js");

var TodoListHeaderView = View.define("TodoListHeaderView", {

    /**
     * @type {TodoListItemModel}
     */
    __newTodoListItem: null,

    /**
     * @type {NewTodoInputView}
     */
    __newTodoInput: null,

    $template: require("./TodoListHeaderView.html"),

    init: function () {

        this.Super();

        this._initSubViews();

    },

    _initSubViews: function () {

        this.__newTodoListItem = new TodoListItemModel();

        this.__newTodoInput = new NewTodoInputView();
        this.__newTodoInput.bind(this.__newTodoListItem);
        this.__newTodoInput.on("newTodo", this._onNewTodo);

        this.Super._append(this.__newTodoInput).at("header");

    },

    /**
     * @param {String} newTodoValue
     * @private
     */
    _onNewTodo: function (newTodoValue) {

        var nodeMap = this.Super._getNodeMap(),
            self = this;

        this.__newTodoListItem.set("title", newTodoValue.trim());
        this.__newTodoListItem.validate(function onValidated(validation) {

            if (validation.result === true) {

                self.__newTodoListItem.save(function onSaved(err) {

                    if (err) throw err;

                    self.__newTodoListItem = new TodoListItemModel();
                    self.__newTodoInput.bind(self.__newTodoListItem)

                });
            }

        });
    }

});

module.exports = TodoListHeaderView;