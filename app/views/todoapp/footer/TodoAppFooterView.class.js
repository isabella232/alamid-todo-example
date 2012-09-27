"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoAppFooterView = View.define("TodoAppFooterView", {

    $template: require("./TodoAppFooterView.html")

});

module.exports = TodoAppFooterView;