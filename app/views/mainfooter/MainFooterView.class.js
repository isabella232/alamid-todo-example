"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var FooterView = View.define("FooterView", {

    $template: require("./MainFooterView.html")

});

module.exports = FooterView;