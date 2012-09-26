"use strict";

var alamid = require("alamid"),
    Page = alamid.Page;

var MainPage = Page.define("MainPage", {

    $template: require("./MainPage.html")

});

module.exports = MainPage;