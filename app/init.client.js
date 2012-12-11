"use strict";

var alamid = require("alamid"),
    app = alamid.app,
    jQuery = alamid.util.jQuery;

app.addRoute("*", function () {
    // Overwrite alamid's default 404 Page and do nothing,
    // Because in this app there is only one Page: MainPage.
});

window._ = require("alamid").util.underscore;

jQuery(document).ready(function onDomReady() {
    app.start();
    //to be done after websockets have been enabled via app.start()
    app.enableModelSubscribe();
});