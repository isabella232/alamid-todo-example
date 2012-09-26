"use strict";

var alamid = require("alamid"),
    Model = alamid.Model;

var TodoListItemModel = Model.define("TodoListItemModel", {

    $url: "todolistitem"

});

module.exports = TodoListItemModel;