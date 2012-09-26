"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var TodoListHeaderView = require("../../views/todolist/header/TodoListHeaderView.class.js"),
    TodoListContentView = require("../../views/todolist/content/TodoListContentView.class.js"),
    TodoListFooterView = require("../../views/todolist/footer/TodoListFooterView.class.js");

var TodoListPage = Page.define("TodoListPage", {

    /**
     * @type {HeaderView}
     */
    __header: null,

    /**
     * @type {ContentView}
     */
    __content: null,

    /**
     * @type {FooterView}
     */
    __footer: null,

    $template: require("./TodoListPage.html"),

    init: function () {

        this.Super();

        this._initViews();

    },

    _initViews: function () {

        this.__header = new TodoListHeaderView();
        this.Super._append(this.__header).at("todo_page");

        this.__content = new TodoListContentView();
        this.Super._append(this.__content).at("todo_page");

        this.__footer = new TodoListFooterView();
        this.Super._append(this.__footer).at("todo_page");

    }

});

module.exports = TodoListPage;