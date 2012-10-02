"use strict";

var alamid = require("alamid"),
    Model = alamid.Model;

var TodoModel = Model.define("TodoModel", {

    $url: "todo"

});

module.exports = TodoModel;