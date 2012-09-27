"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var TodoAppHeaderView = require("../views/todoapp/header/TodoAppHeaderView.class.js"),
    TodoAppMainView = require("../views/todoapp/main/TodoAppMainView.class.js"),
    TodoAppFooterView = require("../views/todoapp/footer/TodoAppFooterView.class.js");

var MainPage = Page.define("MainPage", {

    /**
     * @type {TodoAppHeaderView}
     */
    __appHeader: null,

    /**
     * @type {TodoAppMainView}
     */
    __appMain: null,

    /**
     * @type {TodoAppFooterView}
     */
    __appFooter: null,

    $template: require("./MainPage.html"),

    init: function () {

        this.Super();

        this._initViews();

    },

    _initViews: function () {

        this.__appHeader = new TodoAppHeaderView();
        this.Super._append(this.__appHeader).at("todoapp");

        this.__appMain = new TodoAppMainView();
        this.Super._append(this.__appMain).at("todoapp");

        this.__appFooter = new TodoAppFooterView();
        this.Super._append(this.__appFooter).at("todoapp");
    }

});

module.exports = MainPage;