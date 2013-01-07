"use strict";

var alamid = require("alamid"),
    Model = alamid.Model;

var TodoModel = Model.extend("TodoModel", {

    url: "todo",

    toggle: function (value) {
        if (value === undefined) {
            value = !this.get("completed");
        }
        this.set("completed", value);
        this.save(function onModelSave(err) {
            if (err) throw err;
        });
    }

});

module.exports = TodoModel;