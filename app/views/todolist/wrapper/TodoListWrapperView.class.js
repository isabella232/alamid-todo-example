"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListHeaderView = require("./header/TodoListHeaderView.class.js"),
    TodoListContentView = require("./content/TodoListContentView.class.js"),
    TodoListFooterView = require("./footer/TodoListFooterView.class.js");

var TodoListItemModel = require("../../../models/todolistitem/TodoListItemModel.class.js");

var TodoListWrapperView = View.define("TodoListWrapperView", {

    /**
     * @type {TodoListHeaderView}
     */
    __header: null,

    /**
     * @type {TodoListContentView}
     */
    __content: null,

    /**
     * @type {TodoListFooterView}
     */
    __footer: null,

    /**
     * @type {ModelCollection}
     */
    __todoListItems: null,

    $template: require("./TodoListWrapperView.html"),

    init: function () {

        this.Super();

        this._initSubViews();

    },

    _initSubViews: function () {

        this.__header = new TodoListHeaderView();
        this.Super._append(this.__header).at("wrapper");

        this.__content = new TodoListContentView();
        this.Super._append(this.__content).at("wrapper");

        this.__footer = new TodoListFooterView();
        this.Super._append(this.__footer).at("wrapper");

    }

});

module.exports = TodoListWrapperView;