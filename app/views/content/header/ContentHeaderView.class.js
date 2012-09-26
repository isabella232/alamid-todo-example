"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var HeaderView = View.define("HeaderView", {

    $template: require("./ContentHeaderView.html")

});

module.exports = HeaderView;