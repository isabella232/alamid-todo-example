"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListHeaderView = View.define("TodoListHeaderView", {

    $template: require("./TodoListHeaderView.html")

});

module.exports = TodoListHeaderView;