"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var FooterView = View.define("FooterView", {

    $template: require("./FooterView.html")

});

module.exports = FooterView;