"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var HeaderView = View.define("HeaderView", {

    $template: require("./HeaderView.html")

});

module.exports = HeaderView;