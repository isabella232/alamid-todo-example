"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

/*
var Content = require("../views/content/ContentView.class.js"),
    Footer = require("../views/mainfooter/MainFooterView.class.js");
*/

var MainPage = Page.define("MainPage", {


    /**
     * @type {HeaderView}
     */
    //__header: null,

    /*
     * @type {ContentView}
     */
    //__content: null,

    /**
     * @type {FooterView}
     */
    //__footer: null,

    $template: require("./MainPage.html"),

    /*
    init: function () {

        this.Super();

        this._initViews();

    },

    _initViews: function () {

        this.__header = new Heaeder();
        this.Super._append(this.__header).at("main_page");

        this.__content = new Content();
        this.Super._append(this.__content).at("main_page");

        this.__footer = new Footer();
        this.Super._append(this.__footer).at("main_page");

    }
    */


});

module.exports = MainPage;