"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoLostFooterView = View.define("TodoLostFooterView", {

    $template: require("./TodoLostFooterView.html")

});

module.exports = TodoLostFooterView;