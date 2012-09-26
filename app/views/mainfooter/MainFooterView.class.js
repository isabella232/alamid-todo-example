"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var MainFooterView = View.define("MainFooterView", {

    $template: require("./MainFooterView.html")

});

module.exports = MainFooterView;