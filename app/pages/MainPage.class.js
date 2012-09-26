"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var FooterView = require("../views/main/footer/FooterView.class.js");

var MainPage = Page.define("MainPage", {

    __footer: null,

    $template: require("./MainPage.html"),

    init: function () {

        this.Super();

        this.__footer = new FooterView();
        this.Super._append(this.__footer).at("page");

    }

});

module.exports = MainPage;