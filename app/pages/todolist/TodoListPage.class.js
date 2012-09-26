"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var Header = require("../../views/header/HeaderView.class.js"),
    Content = require("../../views/content/ContentView.class.js"),
    Footer = require("../../views/footer/FooterView.class.js");

var TodoListPage = Page.define("TodoListPage", {

    /**
     * @type {HeaderView}
     */
    __header: null,

    /*
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

        this.__header = new Header();
        this.Super._append(this.__header).at("todo_page");

        this.__content = new Content();
        this.Super._append(this.__content).at("todo_page");

        this.__footer = new Footer();
        this.Super._append(this.__footer).at("todo_page");

    }

});

module.exports = TodoListPage;