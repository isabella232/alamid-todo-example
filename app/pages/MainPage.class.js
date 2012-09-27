"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var TodoListWrapperView = require("../views/todolist/wrapper/TodoListWrapperView.class.js");

var MainPage = Page.define("MainPage", {

    /**
     * TodoListWrapperView
     */
    __wrapper: null,

    __footer: null,

    $template: require("./MainPage.html"),

    init: function () {

        this.Super();

        this.__wrapper = new TodoListWrapperView();
        this.Super._prepend(this.__wrapper).at("page");

    }

});

module.exports = MainPage;