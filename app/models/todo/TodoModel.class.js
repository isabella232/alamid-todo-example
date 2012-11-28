"use strict";

var alamid = require("alamid"),
    Model = alamid.Model;

var TodoModel = Model.define("TodoModel", {

    $url: "todo",

    toggle: function (value) {
        if (value === undefined) {
            value = !this.Super.get("completed");
        }
        this.Super.set("completed", value);
        this.Super.save(function onModelSave(err) {
            if (err) throw err;
        });
    }

});

module.exports = TodoModel;