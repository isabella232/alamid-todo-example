"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var TodoAppHeaderView = require("../views/todoapp/header/TodoAppHeaderView.class.js"),
    TodoAppMainView = require("../views/todoapp/main/TodoAppMainView.class.js"),
    TodoAppFooterView = require("../views/todoapp/footer/TodoAppFooterView.class.js");

var TodoListItemModel = require("../models/todolistitem/TodoListItemModel.class.js");

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

        var self = this;

        this.__appHeader = new TodoAppHeaderView();
        this.Super._append(this.__appHeader).at("todoapp");

        this.__appMain = new TodoAppMainView();
        this.Super._append(this.__appMain).at("todoapp");

        this.__appFooter = new TodoAppFooterView();
        this.Super._append(this.__appFooter).at("todoapp");
        TodoListItemModel.on("create", function onCreate() {
            self._toggleAppFooterVisibility();
        });
        TodoListItemModel.on("delete", function onDelete() {
            self._toggleAppFooterVisibility();
        });

        this._toggleAppFooterVisibility();

    },

    /**
     * @private
     */
    _toggleAppFooterVisibility: function () {
        if(this.__appMain.getTodoListSize() > 0) {
            this.__appFooter.display();
        } else {
            this.__appFooter.hide();
        }
    }

});

module.exports = MainPage;