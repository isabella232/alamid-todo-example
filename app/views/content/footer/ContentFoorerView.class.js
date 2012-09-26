"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var ContentFooterView = View.define("ConentFooterView", {

    $template: require("./ContentFooterView.html")

});

module.exports = ContentFooterView;