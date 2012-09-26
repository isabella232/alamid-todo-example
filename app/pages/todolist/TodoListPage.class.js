"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var TodoListWrapperView = require("../../views/todolist/wrapper/TodoListWrapperView.class.js"),
    TodoLostFooterView = require("../../views/todolist/footer/TodoLostFooterView.class.js");

var TodoListPage = Page.define("TodoListPage", {

    /**
     * TodoListWrapperView
     */
    __wrapper: null,

    __footer: null,

    $template: require("./TodoListPage.html"),

    init: function () {

        this.Super();

        this.__wrapper = new TodoListWrapperView();
        this.Super._append(this.__wrapper).at("page");

        this.__footer = new TodoLostFooterView();
        this.Super._append(this.__footer).at("page");

    }

});

module.exports = TodoListPage;